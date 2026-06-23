package mt.project.aiagent.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AiClientConfig {

    @Bean("openAiClient")
    public ChatClient openAiClient(OpenAiChatModel openAiModel) {
        return ChatClient.create(openAiModel);
    }

    @Bean("groqClient")
    public ChatClient groqClient(
            @Value("${spring.ai.openai.groq.api-key}") String apiKey,
            @Value("${spring.ai.openai.groq.base-url}") String baseUrl,
            @Value("${spring.ai.openai.groq.chat.options.model}") String model) {

        OpenAiApi groqApi = new OpenAiApi(baseUrl, apiKey);
        OpenAiChatOptions options = OpenAiChatOptions.builder()
                .withModel(model)
                .build();
        OpenAiChatModel groqModel = new OpenAiChatModel(groqApi, options);
        return ChatClient.create(groqModel);
    }
}
