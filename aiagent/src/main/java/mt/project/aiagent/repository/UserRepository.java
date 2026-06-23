package mt.project.aiagent.repository;

import mt.project.aiagent.model.User;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface UserRepository extends ReactiveCrudRepository<User, Long>{
    Mono<User> findByUsername(String username);
}
