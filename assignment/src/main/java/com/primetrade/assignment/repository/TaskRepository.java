package com.primetrade.assignment.repository;

import com.primetrade.assignment.model.Task;
import com.primetrade.assignment.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);
}
