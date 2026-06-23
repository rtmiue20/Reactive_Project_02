package mt.project.aiagent.controller;

import lombok.extern.slf4j.Slf4j;
import mt.project.aiagent.model.User;
import mt.project.aiagent.repository.UserRepository;
import mt.project.aiagent.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.security.Principal;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/regist")
    public Mono<ResponseEntity<Map<String, String>>> register(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");
        String email = request.get("email");
        String role = request.get("role");

        if(username==null||password==null||email==null||role==null){
            return Mono.just(new ResponseEntity<>(HttpStatus.BAD_REQUEST));
        }

        return userRepository.findByUsername(username)
                .flatMap(existingUser -> Mono.just(ResponseEntity.badRequest().body(Map.of("error", "Username is already in use"))))
                .switchIfEmpty(Mono.defer(() -> {
                    User user = new User();
                    user.setUsername(username);
                    user.setPassword(passwordEncoder.encode(password));
                    user.setEmail(email);
                    user.setRole(role);
                    return userRepository.save(user)
                            .map(savedUser -> ResponseEntity.ok(Map.of("message", "Regist successfully")));
        }));
    }

    @PostMapping("/login")
    public Mono<ResponseEntity<Map<String, String>>> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        // Tìm User trong DB, so sánh pass băm BCrypt, nếu đúng thì phát JWT
        return userRepository.findByUsername(username)
                .map(user -> {
                    if (passwordEncoder.matches(password, user.getPassword())) {
                        String token = jwtUtil.generateToken(user);
                        return ResponseEntity.ok(Map.of("token", token));
                    } else {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body(Map.of("error", "Sai mật khẩu!"));
                    }
                })
                // Nếu không tìm thấy username trong DB
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Tài khoản không tồn tại!")));
    }
    
    @PutMapping("/update")
    public Mono<ResponseEntity<Map<String, String>>> update(@RequestBody Map<String, String> request, Mono<Principal> principalMono) {
        String password = request.get("password");
        String email = request.get("email");
        String role = request.get("role");

        if (password == null || email == null || role == null) {
            return Mono.just(new ResponseEntity<>(HttpStatus.BAD_REQUEST));
        }

        return principalMono
                .map(Principal::getName)
                .flatMap(username -> userRepository.findByUsername(username))
                .flatMap(user -> {
                    user.setPassword(passwordEncoder.encode(password));
                    user.setEmail(email);
                    user.setRole(role);
                    return userRepository.save(user)
                            .map(savedUser -> ResponseEntity.ok(Map.of("message", "Update successfully")));
                })
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "User not found")));
    }

    @PatchMapping("/patch")
    public Mono<ResponseEntity<Map<String, String>>> patch(@RequestBody Map<String, String> request, Mono<Principal> principalMono) {
        String newPassword = request.get("password");

        if (newPassword == null || newPassword.trim().isEmpty()) {
            return Mono.just(ResponseEntity.badRequest().body(Map.of("error", "Password can not empty!")));
        }

        // 1. Lấy thông tin user đã đăng nhập từ Token
        return principalMono
                .map(Principal::getName) // Lấy ra username
                // 2. Tìm user trong DB bằng username
                .flatMap(username -> userRepository.findByUsername(username))
                // 3. Nếu tìm thấy, tiến hành băm mật khẩu và lưu
                .flatMap(user -> {
                    user.setPassword(passwordEncoder.encode(newPassword));
                    return userRepository.save(user)
                            .map(savedUser -> ResponseEntity.ok(Map.of("message", "Change Password successfully")));
                })
                // 4. Nếu không có token hoặc token sai
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Login error!")));
    }

    @DeleteMapping("/delete")
    public Mono<ResponseEntity<Map<String, String>>> delete(Mono<Principal> principalMono) {
        return principalMono
                .map(Principal::getName)
                .flatMap(username -> userRepository.findByUsername(username))
                .flatMap(user -> userRepository.delete(user)
                        .then(Mono.just(ResponseEntity.ok(Map.of("message", "Delete successfully")))))
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "User not found")));
    }
}
