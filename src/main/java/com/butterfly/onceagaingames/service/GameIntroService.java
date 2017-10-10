package com.butterfly.onceagaingames.service;

import com.butterfly.onceagaingames.domain.GameIntro;
import java.util.List;

/**
 * Service Interface for managing GameIntro.
 */
public interface GameIntroService {

    /**
     * Save a gameIntro.
     *
     * @param gameIntro the entity to save
     * @return the persisted entity
     */
    GameIntro save(GameIntro gameIntro);

    /**
     *  Get all the gameIntros.
     *
     *  @return the list of entities
     */
    List<GameIntro> findAll();

    /**
     *  Get the "id" gameIntro.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    GameIntro findOne(Long id);

    /**
     *  Delete the "id" gameIntro.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
