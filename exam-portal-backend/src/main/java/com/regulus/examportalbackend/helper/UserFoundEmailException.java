package com.regulus.examportalbackend.helper;

public class UserFoundEmailException extends Exception{
    public UserFoundEmailException(){
        super("User with this email is already there in DB!! Try with another email");
    }
    public UserFoundEmailException(String msg){ super(msg); }
}
