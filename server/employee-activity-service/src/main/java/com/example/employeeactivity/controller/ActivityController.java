package com.example.employeeactivity.controller;

import com.example.employeeactivity.model.Activity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/activities")
public class ActivityController {

    private List<Activity> activities = new ArrayList<>();

    @GetMapping
    public List<Activity> getAllActivities() {
        return activities;
    }

    @PostMapping
    public Activity createActivity(@RequestBody Activity activity) {
        activities.add(activity);
        return activity;
    }

    @GetMapping("/{id}")
    public Activity getActivityById(@PathVariable Long id) {
        return activities.stream().filter(act -> act.getId().equals(id)).findFirst().orElse(null);
    }

    @PutMapping("/{id}")
    public Activity updateActivity(@PathVariable Long id, @RequestBody Activity activity) {
        Activity existingActivity = activities.stream().filter(act -> act.getId().equals(id)).findFirst().orElse(null);
        if (existingActivity != null) {
            existingActivity.setType(activity.getType());
            existingActivity.setDescription(activity.getDescription());
        }
        return existingActivity;
    }

    @DeleteMapping("/{id}")
    public void deleteActivity(@PathVariable Long id) {
        activities.removeIf(act -> act.getId().equals(id));
    }
}