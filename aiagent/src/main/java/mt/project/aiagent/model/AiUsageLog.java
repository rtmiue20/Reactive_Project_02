package mt.project.aiagent.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import java.time.LocalDateTime;

@Data
@Table("ai_usage_logs")
public class AiUsageLog {
    @Id
    private Long id;
    @Column("user_id")
    private Long userId;
    @Column("agent_id")
    private Long agentId;
    private String prompt;
    @Column("tokens_consumed")
    private Integer tokensConsumed;
    @Column("created_at")
    private LocalDateTime createdAt;
}