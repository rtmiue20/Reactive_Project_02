package mt.project.aiagent.controller;

import lombok.extern.slf4j.Slf4j;
import mt.project.aiagent.model.AiRequest;
import mt.project.aiagent.model.AiResponse;
import mt.project.aiagent.service.AiRouterService;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.Authentication;
import mt.project.aiagent.security.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@Slf4j
@RestController
@RequestMapping("api/ai")
public class AiRouterController {
    private final AiRouterService service;
    private final JwtUtil jwtUtil;

    public AiRouterController(AiRouterService service, JwtUtil jwtUtil) {
        this.service = service;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping(value = "/stream", produces = org.springframework.http.MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<AiResponse> ask(
            @RequestBody AiRequest request,
            @RequestHeader(value = org.springframework.http.HttpHeaders.AUTHORIZATION, required = false) String authHeader) {

        log.info("Hỏi: {}", request.getQuestion());
        
        Long userId = 1L;
        if (request.getUserId() != null) {
            try {
                userId = Long.parseLong(request.getUserId());
            } catch (NumberFormatException e) {
                log.warn("Lỗi parse userId từ request body: {}", e.getMessage());
            }
        }
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            try {
                String token = authHeader.substring(7);
                Claims claims = jwtUtil.getAllClaimsFromToken(token);
                Object claimUserId = claims.get("userId");
                if (claimUserId != null) {
                    userId = Long.valueOf(claimUserId.toString());
                }
            } catch (Exception e) {
                log.warn("Lỗi lấy userId từ token: {}", e.getMessage());
            }
        }

        return service.askBoth(request.getQuestion(), userId)
                .onErrorResume(e -> {
                    log.error("Controller error: {}", e.getMessage());
                    return Flux.just(new AiResponse("SYSTEM", e.getMessage(), true));
                });
    }
}
