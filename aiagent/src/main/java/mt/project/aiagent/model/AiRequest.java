package mt.project.aiagent.model;

import lombok.Data;

@Data
public class AiRequest {
    private String question;  // câu hỏi từ user
    private String userId;    // để log usage
}