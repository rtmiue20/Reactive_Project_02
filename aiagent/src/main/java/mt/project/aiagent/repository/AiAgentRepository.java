package mt.project.aiagent.repository;

import mt.project.aiagent.model.AiAgent;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface AiAgentRepository extends ReactiveCrudRepository<AiAgent,Long> {
    Flux<AiAgent> findByStatus(String status);
}
