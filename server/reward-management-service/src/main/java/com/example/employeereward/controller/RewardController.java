package com.example.employeereward.controller;

import com.example.employeereward.model.Reward;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/rewards")
public class RewardController {

    private List<Reward> rewards = new ArrayList<>();

    @GetMapping
    public List<Reward> getAllRewards() {
        return rewards;
    }

    @PostMapping
    public Reward createReward(@RequestBody Reward reward) {
        rewards.add(reward);
        return reward;
    }

    @GetMapping("/{id}")
    public Reward getRewardById(@PathVariable Long id) {
        return rewards.stream().filter(rew -> rew.getId().equals(id)).findFirst().orElse(null);
    }

    @PutMapping("/{id}")
    public Reward updateReward(@PathVariable Long id, @RequestBody Reward reward) {
        Reward existingReward = rewards.stream().filter(rew -> rew.getId().equals(id)).findFirst().orElse(null);
        if (existingReward != null) {
            existingReward.setType(reward.getType());
            existingReward.setDescription(reward.getDescription());
        }
        return existingReward;
    }

    @DeleteMapping("/{id}")
    public void deleteReward(@PathVariable Long id) {
        rewards.removeIf(rew -> rew.getId().equals(id));
    }
}