package com.butterfly.onceagaingames.repository;

import com.butterfly.onceagaingames.domain.GameIntro;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the GameIntro entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GameIntroRepository extends JpaRepository<GameIntro, Long> {

}
