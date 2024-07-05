package org.example.udptprojectserver.controller;

import org.example.udptprojectserver.dto.AuthResponseDto;
import org.example.udptprojectserver.dto.LoginDto;
import org.example.udptprojectserver.dto.RegisterDto;
import org.example.udptprojectserver.model.Role;
import org.example.udptprojectserver.model.UserEntity;
import org.example.udptprojectserver.repository.RoleRepository;
import org.example.udptprojectserver.repository.UserRepository;
import org.example.udptprojectserver.security.JWTGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
@Validated
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTGenerator jwtGenerator;
    private final CustomerRepository customerRepository;
    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository,
                          RoleRepository roleRepository, PasswordEncoder passwordEncoder, JWTGenerator jwtGenerator, CustomerRepository customerRepository)
    {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
        this.customerRepository = customerRepository;
    }

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        if(userRepository.existsByPhoneNumber(registerDto.getPhoneNumber())) {
            return new ResponseEntity<>("Phone number is already in the system", HttpStatus.BAD_REQUEST);
        }

        //Create a new customer information for the account
        Customer customer = new Customer();
        customer.setPhone(registerDto.getPhoneNumber());
        customer.setEmail(registerDto.getEmail());
        customer.setName(registerDto.getName());

        // Get the id of the customer
        String customerId =  customerRepository.save(customer).getId();

        //Create a new account
        UserEntity user = new UserEntity();
        user.setPhoneNumber(registerDto.getPhoneNumber());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        // Set the customer id to the user
        user.setCustomerId(customerId);

        Role roles = roleRepository.findByName("USER").get();
        user.setRoles(Collections.singletonList(roles));

        // Get the id of the user
        int userEntityId = userRepository.save(user).getId();
        // Set the user id to the customer
        customer.setUserEntityId(Integer.toString(userEntityId));
        // Update the customer
        customerRepository.save(customer);

        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }

    @PostMapping("login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getPhoneNumber(),
                        loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);

        // Find the UserEntity by phone number
        UserEntity userEntity = userRepository.findByPhoneNumber(loginDto.getPhoneNumber()).orElse(null);
        if (userEntity == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // Get the customer ID from the UserEntity
        String customerId = userEntity.getCustomerId();

        return new ResponseEntity<>(new AuthResponseDto(token, customerId), HttpStatus.OK);
    }
}
