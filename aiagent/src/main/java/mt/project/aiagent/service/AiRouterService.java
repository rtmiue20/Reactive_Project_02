package mt.project.aiagent.service;

import lombok.extern.slf4j.Slf4j;
import mt.project.aiagent.model.AiResponse;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Slf4j
@Service
public class AiRouterService {
    private final ChatClient openAiClient;
    private final ChatClient groqClient;
    private final mt.project.aiagent.repository.AiUsageLogRepository usageLogRepository;

    public AiRouterService(@Qualifier("openAiClient") ChatClient openAiClient, 
                           @Qualifier("groqClient") ChatClient groqClient,
                           mt.project.aiagent.repository.AiUsageLogRepository usageLogRepository) {
        this.openAiClient = openAiClient;
        this.groqClient = groqClient;
        this.usageLogRepository = usageLogRepository;
    }

    public Flux<AiResponse> askBoth(String question, Long userId) {
        // Luồng từ OpenAI
        Flux<AiResponse> gptStream = openAiClient.prompt()
                .user(question)
                .stream()
                .content()
                .map(chunk -> new AiResponse("OPENAI", chunk, false))
                .concatWith(Flux.just(new AiResponse("OPENAI", "", true)))
                .onErrorResume(e -> {
                    log.error("OpenAI error: {}", e.getMessage());
                    return Flux.just(new AiResponse("OPENAI", "Lỗi: " + e.getMessage(), true));
                });
        // Luồng từ Groq
        Flux<AiResponse> groqStream = groqClient.prompt()
                .user(question)
                .stream()
                .content()
                .map(chunk -> new AiResponse("GROQ", chunk, false))
                .concatWith(Flux.just(new AiResponse("GROQ", "", true)))
                .onErrorResume(e -> {
                    log.error("Groq error: {}", e.getMessage());
                    return Flux.just(new AiResponse("GROQ", "Lỗi: " + e.getMessage(), true));
                });

        // Tạo log entry
        mt.project.aiagent.model.AiUsageLog logEntry = new mt.project.aiagent.model.AiUsageLog();
        logEntry.setUserId(userId);
        logEntry.setPrompt(question);
        logEntry.setCreatedAt(java.time.LocalDateTime.now());

        // Lưu log và trả về stream AI
        return usageLogRepository.save(logEntry)
                .doOnSuccess(saved -> log.info("Đã lưu log cho user {}: id={}", userId, saved.getId()))
                .doOnError(e -> log.error("Lỗi lưu log: {}", e.getMessage()))
                .thenMany(Flux.merge(gptStream, groqStream));
    }
}