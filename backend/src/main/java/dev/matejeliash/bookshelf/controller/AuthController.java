package dev.matejeliash.bookshelf.controller;

import dev.matejeliash.bookshelf.dto.LoginUserDto;
import dev.matejeliash.bookshelf.dto.RegisterUserDto;
import dev.matejeliash.bookshelf.dto.VerifyUserDto;
import dev.matejeliash.bookshelf.model.User;
import dev.matejeliash.bookshelf.response.LoginResponse;
import dev.matejeliash.bookshelf.response.RegisterResponse;
import dev.matejeliash.bookshelf.response.VerifyResponse;
import dev.matejeliash.bookshelf.service.AuthentificationService;
import dev.matejeliash.bookshelf.service.JwtService;
import java.util.Objects;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private JwtService jwtService;
    private AuthentificationService authentificationService;

    public AuthController(
        JwtService jwtService,
        AuthentificationService authentificationService
    ) {
        this.jwtService = jwtService;
        this.authentificationService = authentificationService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
        @RequestBody RegisterUserDto registerUserDto
    ) {
        User registeredUser = authentificationService.register(registerUserDto);
        RegisterResponse user = new RegisterResponse(
            registeredUser.getEmail(),
            registeredUser.getUsername()
        );
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> register(
        @RequestBody LoginUserDto loginUserDto
    ) {
        User registeredUser = authentificationService.authenticate(
            loginUserDto
        );
        String jwtToken = jwtService.generateToken(registeredUser);
        // include jwt token
        LoginResponse loginResponse = new LoginResponse(
            jwtToken,
            jwtService.getExpirationTime()
        );

        return ResponseEntity.ok(loginResponse);
    }

    // used for refreshing/creating new jwt token for logged user
    @PostMapping("/refresh")
    public ResponseEntity<LoginResponse> refresh(
        @RequestHeader("Authorization") String authHeader,
        @AuthenticationPrincipal User user
    ) {
        // dumbest jwt check
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            //  System.out.println("bearer check");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = authHeader.substring(7);
        String username;
        try {
            username = jwtService.extractUsername(token);
            // in case that logged user uses somebody elses token
            if (!Objects.equals(username, user.getUsername())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            //System.out.println("exception check");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        if (!jwtService.isTokenValid(token, user)) {
            // System.out.println("invalid token check");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // create same object like after logging
        String jwtToken = jwtService.generateToken(user);
        LoginResponse loginResponse = new LoginResponse(
            jwtToken,
            jwtService.getExpirationTime()
        );

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/verify")
    public ResponseEntity<VerifyResponse> verifyUser(
        @RequestBody VerifyUserDto verifyUserDto
    ) {
        authentificationService.verifyUser(verifyUserDto);
        // we return string / no need for additional info

        VerifyResponse res = new VerifyResponse(verifyUserDto.getEmail());
        return ResponseEntity.ok(res);
    }

    @PostMapping("/resend")
    public ResponseEntity<String> resendVerificationCode(
        @RequestBody String email
    ) {
        authentificationService.resendVerificationCode(email);
        return ResponseEntity.ok("Verification email resend.");
    }
}
