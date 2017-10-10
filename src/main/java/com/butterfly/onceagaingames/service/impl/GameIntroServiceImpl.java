package com.butterfly.onceagaingames.service.impl;

import com.butterfly.onceagaingames.service.GameIntroService;
import com.butterfly.onceagaingames.domain.GameIntro;
import com.butterfly.onceagaingames.repository.GameIntroRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing GameIntro.
 */
@Service
@Transactional
public class GameIntroServiceImpl implements GameIntroService{

    private final Logger log = LoggerFactory.getLogger(GameIntroServiceImpl.class);

    private final GameIntroRepository gameIntroRepository;

    public GameIntroServiceImpl(GameIntroRepository gameIntroRepository) {
        this.gameIntroRepository = gameIntroRepository;
    }

    /**
     * Save a gameIntro.
     *
     * @param gameIntro the entity to save
     * @return the persisted entity
     */
    @Override
    public GameIntro save(GameIntro gameIntro) {
        log.debug("Request to save GameIntro : {}", gameIntro);
        return gameIntroRepository.save(gameIntro);
    }

    /**
     *  Get all the gameIntros.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GameIntro> findAll() {
        log.debug("Request to get all GameIntros");
        return gameIntroRepository.findAll();
    }

    /**
     *  Get one gameIntro by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public GameIntro findOne(Long id) {
        log.debug("Request to get GameIntro : {}", id);
        return gameIntroRepository.findOne(id);
    }

    /**
     *  Delete the  gameIntro by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GameIntro : {}", id);
        gameIntroRepository.delete(id);
    }
}
