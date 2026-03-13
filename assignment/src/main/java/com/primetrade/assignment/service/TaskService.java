package com.primetrade.assignment.service;

import com.primetrade.assignment.dto.TaskRequest;
import com.primetrade.assignment.model.Task;
import com.primetrade.assignment.model.User;
import com.primetrade.assignment.repository.TaskRepository;
import com.primetrade.assignment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Import this

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional // Adding this at the class level ensures all methods are transactional
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    /**
     * Helper to get the authenticated User object directly from the Security Context.
     * This avoids redundant database calls and string matching errors.
     */
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Not authenticated");
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof User) {
            return (User) principal;
        }

        // If the principal is just a string (the email), find it in DB
        return userRepository.findByEmail(principal.toString())
                .orElseThrow(() -> new RuntimeException("User not found in context"));
    }

    public Task createTask(TaskRequest request) {
        User user = getCurrentUser();

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(request.getStatus())
                .createdAt(LocalDateTime.now())
                .user(user) // Link the actual object
                .build();

        return taskRepository.save(task);
    }

    public List<Task> getMyTasks() {
        User user = getCurrentUser();
        // Switching to findByUser is much more reliable than searching by string email
        return taskRepository.findByUser(user);
    }

    public Task updateTask(Long id, TaskRequest request) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        User currentUser = getCurrentUser();

        // Security check: IDs are more reliable than string comparisons
        if (!task.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You can only update your own tasks");
        }

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());

        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        taskRepository.delete(task);
    }
}