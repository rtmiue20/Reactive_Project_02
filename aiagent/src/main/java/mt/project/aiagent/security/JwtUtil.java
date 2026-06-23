package mt.project.aiagent.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import mt.project.aiagent.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expirationTime;

    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    // Hàm tạo Token JWT sau khi User đăng nhập thành công
    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        String role = user.getRole();
        if (role != null) {
            role = role.replace("ROLE_", "");
        }
        claims.put("role", role);
        claims.put("userId", user.getId());

        return Jwts.builder()
                .claims(claims)
                .subject(user.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(getKey())
                .compact();
    }

    // Hàm bóc tách lấy toàn bộ thông tin (Claims) từ trong Token ra
    public Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // Hàm lấy Username từ Token
    public String getUsernameFromToken(String token) {
        return getAllClaimsFromToken(token).getSubject();
    }

    // Hàm kiểm tra Token còn hạn hay đã hết hạn
    public Boolean isTokenExpired(String token) {
        return  getAllClaimsFromToken(token).getExpiration().before(new Date());
    }

}
