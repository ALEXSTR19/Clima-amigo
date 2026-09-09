package com.climaamigo.app.Repositories;

import com.climaamigo.app.Models.Inventario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventarioRepository
        extends JpaRepository<Inventario, Long> {

}