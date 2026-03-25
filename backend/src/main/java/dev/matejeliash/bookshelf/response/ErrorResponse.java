package dev.matejeliash.bookshelf.response;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ErrorResponse {

    private String errorCode; // have to convert to String for JSON
    private int httpStatus; // also to int for JSON
    private String message; //

}

