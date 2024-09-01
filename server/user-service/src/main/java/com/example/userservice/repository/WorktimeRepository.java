package com.example.userservice.repository;

import com.example.userservice.model.Worktime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorktimeRepository extends JpaRepository<Worktime, Long> {
    Optional<Worktime> findByUserIdAndDay(Long userId, String day);
}