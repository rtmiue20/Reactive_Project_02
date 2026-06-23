package mt.project.aiagent.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table("ai_agents")
public class AiAgent {
    @Id
    private Long id;
    private String name;
    private String provider;
    private String apiUrl;
    private String status;
}

