package com.butterfly.onceagaingames.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.butterfly.onceagaingames.domain.GameIntro;
import com.butterfly.onceagaingames.service.GameIntroService;
import com.butterfly.onceagaingames.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing GameIntro.
 */
@RestController
@RequestMapping("/api")
public class GameIntroResource {

    private final Logger log = LoggerFactory.getLogger(GameIntroResource.class);

    private static final String ENTITY_NAME = "gameIntro";

    private final GameIntroService gameIntroService;

    public GameIntroResource(GameIntroService gameIntroService) {
        this.gameIntroService = gameIntroService;
    }

    /**
     * POST  /game-intros : Create a new gameIntro.
     *
     * @param gameIntro the gameIntro to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gameIntro, or with status 400 (Bad Request) if the gameIntro has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/game-intros")
    @Timed
    public ResponseEntity<GameIntro> createGameIntro(@RequestBody GameIntro gameIntro) throws URISyntaxException {
        log.debug("REST request to save GameIntro : {}", gameIntro);
        if (gameIntro.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new gameIntro cannot already have an ID")).body(null);
        }
        GameIntro result = gameIntroService.save(gameIntro);
        return ResponseEntity.created(new URI("/api/game-intros/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /game-intros : Updates an existing gameIntro.
     *
     * @param gameIntro the gameIntro to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gameIntro,
     * or with status 400 (Bad Request) if the gameIntro is not valid,
     * or with status 500 (Internal Server Error) if the gameIntro couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/game-intros")
    @Timed
    public ResponseEntity<GameIntro> updateGameIntro(@RequestBody GameIntro gameIntro) throws URISyntaxException {
        log.debug("REST request to update GameIntro : {}", gameIntro);
        if (gameIntro.getId() == null) {
            return createGameIntro(gameIntro);
        }
        GameIntro result = gameIntroService.save(gameIntro);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gameIntro.getId().toString()))
            .body(result);
    }

    /**
     * GET  /game-intros : get all the gameIntros.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gameIntros in body
     */
    @GetMapping("/game-intros")
    @Timed
    public List<GameIntro> getAllGameIntros() {
        log.debug("REST request to get all GameIntros");
        return gameIntroService.findAll();
        }

    /**
     * GET  /game-intros/:id : get the "id" gameIntro.
     *
     * @param id the id of the gameIntro to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gameIntro, or with status 404 (Not Found)
     */
    @GetMapping("/game-intros/{id}")
    @Timed
    public ResponseEntity<GameIntro> getGameIntro(@PathVariable Long id) {
        log.debug("REST request to get GameIntro : {}", id);
        GameIntro gameIntro = gameIntroService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(gameIntro));
    }

    /**
     * DELETE  /game-intros/:id : delete the "id" gameIntro.
     *
     * @param id the id of the gameIntro to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/game-intros/{id}")
    @Timed
    public ResponseEntity<Void> deleteGameIntro(@PathVariable Long id) {
        log.debug("REST request to delete GameIntro : {}", id);
        gameIntroService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
