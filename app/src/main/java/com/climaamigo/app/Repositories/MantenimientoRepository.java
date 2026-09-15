package com.climaamigo.app.Repositories;

import com.climaamigo.app.Models.Mantenimientos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MantenimientoRepository extends JpaRepository <Mantenimientos, Long> {
}
