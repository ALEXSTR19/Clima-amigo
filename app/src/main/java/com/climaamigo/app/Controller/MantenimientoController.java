package com.climaamigo.app.Controller;

import com.climaamigo.app.Models.Mantenimientos;
import com.climaamigo.app.Services.MantenimientoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/mantenimientos")
@CrossOrigin(origins = "http://localhost:4200")
public class MantenimientoController {

    private final MantenimientoService mantenimientoService;

    public MantenimientoController(MantenimientoService mantenimientoService) {
        this.mantenimientoService = mantenimientoService;
    }

    @GetMapping
    public List<Mantenimientos> listarMantenimientos() {
        return mantenimientoService.listarMantenimientos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mantenimientos> obtenerPorId(@PathVariable Long id) {
        return mantenimientoService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Mantenimientos> crear(
            @Valid @RequestBody Mantenimientos mantenimiento,
            UriComponentsBuilder uriBuilder) {
        Mantenimientos nuevo = mantenimientoService.guardar(mantenimiento);
        URI ubicacion = uriBuilder.path("/api/mantenimientos/{id}")
                .buildAndExpand(nuevo.getId())
                .toUri();
        return ResponseEntity.created(ubicacion).body(nuevo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Mantenimientos> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody Mantenimientos mantenimiento) {
        return mantenimientoService.actualizar(id, mantenimiento)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!mantenimientoService.eliminar(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
