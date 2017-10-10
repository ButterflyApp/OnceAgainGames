package com.butterfly.onceagaingames.web.rest;

import com.butterfly.onceagaingames.OnceAgainGamesApp;

import com.butterfly.onceagaingames.domain.GameIntro;
import com.butterfly.onceagaingames.repository.GameIntroRepository;
import com.butterfly.onceagaingames.service.GameIntroService;
import com.butterfly.onceagaingames.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GameIntroResource REST controller.
 *
 * @see GameIntroResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = OnceAgainGamesApp.class)
public class GameIntroResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final byte[] DEFAULT_WALLPAPER = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_WALLPAPER = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_WALLPAPER_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_WALLPAPER_CONTENT_TYPE = "image/png";

    @Autowired
    private GameIntroRepository gameIntroRepository;

    @Autowired
    private GameIntroService gameIntroService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGameIntroMockMvc;

    private GameIntro gameIntro;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GameIntroResource gameIntroResource = new GameIntroResource(gameIntroService);
        this.restGameIntroMockMvc = MockMvcBuilders.standaloneSetup(gameIntroResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GameIntro createEntity(EntityManager em) {
        GameIntro gameIntro = new GameIntro()
            .name(DEFAULT_NAME)
            .wallpaper(DEFAULT_WALLPAPER)
            .wallpaperContentType(DEFAULT_WALLPAPER_CONTENT_TYPE);
        return gameIntro;
    }

    @Before
    public void initTest() {
        gameIntro = createEntity(em);
    }

    @Test
    @Transactional
    public void createGameIntro() throws Exception {
        int databaseSizeBeforeCreate = gameIntroRepository.findAll().size();

        // Create the GameIntro
        restGameIntroMockMvc.perform(post("/api/game-intros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameIntro)))
            .andExpect(status().isCreated());

        // Validate the GameIntro in the database
        List<GameIntro> gameIntroList = gameIntroRepository.findAll();
        assertThat(gameIntroList).hasSize(databaseSizeBeforeCreate + 1);
        GameIntro testGameIntro = gameIntroList.get(gameIntroList.size() - 1);
        assertThat(testGameIntro.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGameIntro.getWallpaper()).isEqualTo(DEFAULT_WALLPAPER);
        assertThat(testGameIntro.getWallpaperContentType()).isEqualTo(DEFAULT_WALLPAPER_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createGameIntroWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gameIntroRepository.findAll().size();

        // Create the GameIntro with an existing ID
        gameIntro.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGameIntroMockMvc.perform(post("/api/game-intros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameIntro)))
            .andExpect(status().isBadRequest());

        // Validate the GameIntro in the database
        List<GameIntro> gameIntroList = gameIntroRepository.findAll();
        assertThat(gameIntroList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGameIntros() throws Exception {
        // Initialize the database
        gameIntroRepository.saveAndFlush(gameIntro);

        // Get all the gameIntroList
        restGameIntroMockMvc.perform(get("/api/game-intros?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gameIntro.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].wallpaperContentType").value(hasItem(DEFAULT_WALLPAPER_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].wallpaper").value(hasItem(Base64Utils.encodeToString(DEFAULT_WALLPAPER))));
    }

    @Test
    @Transactional
    public void getGameIntro() throws Exception {
        // Initialize the database
        gameIntroRepository.saveAndFlush(gameIntro);

        // Get the gameIntro
        restGameIntroMockMvc.perform(get("/api/game-intros/{id}", gameIntro.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gameIntro.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.wallpaperContentType").value(DEFAULT_WALLPAPER_CONTENT_TYPE))
            .andExpect(jsonPath("$.wallpaper").value(Base64Utils.encodeToString(DEFAULT_WALLPAPER)));
    }

    @Test
    @Transactional
    public void getNonExistingGameIntro() throws Exception {
        // Get the gameIntro
        restGameIntroMockMvc.perform(get("/api/game-intros/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGameIntro() throws Exception {
        // Initialize the database
        gameIntroService.save(gameIntro);

        int databaseSizeBeforeUpdate = gameIntroRepository.findAll().size();

        // Update the gameIntro
        GameIntro updatedGameIntro = gameIntroRepository.findOne(gameIntro.getId());
        updatedGameIntro
            .name(UPDATED_NAME)
            .wallpaper(UPDATED_WALLPAPER)
            .wallpaperContentType(UPDATED_WALLPAPER_CONTENT_TYPE);

        restGameIntroMockMvc.perform(put("/api/game-intros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGameIntro)))
            .andExpect(status().isOk());

        // Validate the GameIntro in the database
        List<GameIntro> gameIntroList = gameIntroRepository.findAll();
        assertThat(gameIntroList).hasSize(databaseSizeBeforeUpdate);
        GameIntro testGameIntro = gameIntroList.get(gameIntroList.size() - 1);
        assertThat(testGameIntro.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGameIntro.getWallpaper()).isEqualTo(UPDATED_WALLPAPER);
        assertThat(testGameIntro.getWallpaperContentType()).isEqualTo(UPDATED_WALLPAPER_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingGameIntro() throws Exception {
        int databaseSizeBeforeUpdate = gameIntroRepository.findAll().size();

        // Create the GameIntro

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGameIntroMockMvc.perform(put("/api/game-intros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameIntro)))
            .andExpect(status().isCreated());

        // Validate the GameIntro in the database
        List<GameIntro> gameIntroList = gameIntroRepository.findAll();
        assertThat(gameIntroList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteGameIntro() throws Exception {
        // Initialize the database
        gameIntroService.save(gameIntro);

        int databaseSizeBeforeDelete = gameIntroRepository.findAll().size();

        // Get the gameIntro
        restGameIntroMockMvc.perform(delete("/api/game-intros/{id}", gameIntro.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GameIntro> gameIntroList = gameIntroRepository.findAll();
        assertThat(gameIntroList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GameIntro.class);
        GameIntro gameIntro1 = new GameIntro();
        gameIntro1.setId(1L);
        GameIntro gameIntro2 = new GameIntro();
        gameIntro2.setId(gameIntro1.getId());
        assertThat(gameIntro1).isEqualTo(gameIntro2);
        gameIntro2.setId(2L);
        assertThat(gameIntro1).isNotEqualTo(gameIntro2);
        gameIntro1.setId(null);
        assertThat(gameIntro1).isNotEqualTo(gameIntro2);
    }
}
