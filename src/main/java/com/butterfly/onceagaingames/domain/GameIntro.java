package com.butterfly.onceagaingames.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A GameIntro.
 */
@Entity
@Table(name = "game_intro")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GameIntro implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Lob
    @Column(name = "wallpaper")
    private byte[] wallpaper;

    @Column(name = "wallpaper_content_type")
    private String wallpaperContentType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public GameIntro name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getWallpaper() {
        return wallpaper;
    }

    public GameIntro wallpaper(byte[] wallpaper) {
        this.wallpaper = wallpaper;
        return this;
    }

    public void setWallpaper(byte[] wallpaper) {
        this.wallpaper = wallpaper;
    }

    public String getWallpaperContentType() {
        return wallpaperContentType;
    }

    public GameIntro wallpaperContentType(String wallpaperContentType) {
        this.wallpaperContentType = wallpaperContentType;
        return this;
    }

    public void setWallpaperContentType(String wallpaperContentType) {
        this.wallpaperContentType = wallpaperContentType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        GameIntro gameIntro = (GameIntro) o;
        if (gameIntro.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gameIntro.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GameIntro{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", wallpaper='" + getWallpaper() + "'" +
            ", wallpaperContentType='" + wallpaperContentType + "'" +
            "}";
    }
}
