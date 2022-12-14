package com.vs.vs.tournament.repository;

import com.vs.vs.tournament.models.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

    List<Game> findGamesByRoundId(Long id);
}
