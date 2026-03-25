package dev.matejeliash.bookshelf.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyResponse {

    private String email;

    public VerifyResponse(String email) {
        this.email = email;
    }
}
