package com.climaamigo.app.Controller;

import com.climaamigo.app.Models.Mantenimientos;
import com.climaamigo.app.Services.MantenimientoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MantenimientoControllerTest {

    @Mock
    private MantenimientoService mantenimientoService;

    private MantenimientoController mantenimientoController;

    @BeforeEach
    void setUp() {
        mantenimientoController = new MantenimientoController(mantenimientoService);
    }

    @Test
    void obtenerPorIdDevuelveNotFoundCuandoNoExiste() {
        when(mantenimientoService.obtenerPorId(20L)).thenReturn(Optional.empty());

        ResponseEntity<Mantenimientos> respuesta = mantenimientoController.obtenerPorId(20L);

        assertEquals(HttpStatus.NOT_FOUND, respuesta.getStatusCode());
    }

    @Test
    void crearDevuelveCreatedConLaUbicacionDelRecurso() {
        Mantenimientos mantenimiento = new Mantenimientos();
        mantenimiento.setId(3L);
        when(mantenimientoService.guardar(mantenimiento)).thenReturn(mantenimiento);

        ResponseEntity<Mantenimientos> respuesta = mantenimientoController.crear(
                mantenimiento,
                UriComponentsBuilder.newInstance());

        assertEquals(HttpStatus.CREATED, respuesta.getStatusCode());
        assertEquals("/api/mantenimientos/3", respuesta.getHeaders().getLocation().toString());
        assertSame(mantenimiento, respuesta.getBody());
    }

    @Test
    void eliminarDevuelveNotFoundCuandoNoExiste() {
        when(mantenimientoService.eliminar(20L)).thenReturn(false);

        ResponseEntity<Void> respuesta = mantenimientoController.eliminar(20L);

        assertEquals(HttpStatus.NOT_FOUND, respuesta.getStatusCode());
    }

    @Test
    void eliminarDevuelveNoContentCuandoExiste() {
        when(mantenimientoService.eliminar(3L)).thenReturn(true);

        ResponseEntity<Void> respuesta = mantenimientoController.eliminar(3L);

        assertEquals(HttpStatus.NO_CONTENT, respuesta.getStatusCode());
    }
}
