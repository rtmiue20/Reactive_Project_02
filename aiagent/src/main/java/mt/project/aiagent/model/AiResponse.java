package mt.project.aiagent.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AiResponse {
    private String source;   // "GPT" hoặc "GEMINI"
    private String content;  // chunk text trả về
    private boolean done;    // true = stream kết thúc
}