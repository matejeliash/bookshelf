package dev.matejeliash.bookshelf.exception;


import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class APIException extends RuntimeException{

    private HttpStatus  httpStatus;
    private ErrorCode errorCode;

    public  APIException(String message, ErrorCode errorCode,HttpStatus httpStatus){
        super(message);
        this.errorCode=errorCode; // short basic stable and comparable
        this.httpStatus = httpStatus;
    }
}

