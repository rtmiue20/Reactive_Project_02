package mt.project.aiagent.repository;

import mt.project.aiagent.model.AiUsageLog;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AiUsageLogRepository extends ReactiveCrudRepository<AiUsageLog,Long> {

}
