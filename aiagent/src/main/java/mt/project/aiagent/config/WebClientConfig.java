package mt.project.aiagent.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    // Object giúp dễ dàng cấu hình thêm các Header mặc định, thời gian Timeout,
    // hoặc Log dữ liệu khi gọi API sang các bên thứ 3 (OpenAI, Gemini).
    @Bean
    public WebClient.Builder webClient() {
        return WebClient.builder();
    }

    @Bean
    public RestClient.Builder restClientBuilder() {
        return RestClient.builder();
    }
}
