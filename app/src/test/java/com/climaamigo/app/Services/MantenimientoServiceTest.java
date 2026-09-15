package com.climaamigo.app.Services;

import com.climaamigo.app.Models.Mantenimientos;
import com.climaamigo.app.Repositories.MantenimientoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MantenimientoServiceTest {

    @Mock
    private MantenimientoRepository mantenimientoRepository;

    private MantenimientoService mantenimientoService;

    @BeforeEach
    void setUp() {
        mantenimientoService = new MantenimientoService(mantenimientoRepository);
    }

    @Test
    void guardarIgnoraElIdRecibidoYAsignaEstadoPendiente() {
        Mantenimientos mantenimiento = mantenimiento(25L, "");
        when(mantenimientoRepository.save(mantenimiento)).thenReturn(mantenimiento);

        Mantenimientos guardado = mantenimientoService.guardar(mantenimiento);

        assertNull(guardado.getId());
        assertEquals("PENDIENTE", guardado.getEstado());
        verify(mantenimientoRepository).save(mantenimiento);
    }

    @Test
    void actualizarCopiaLosDatosSinCambiarElId() {
        Mantenimientos existente = mantenimiento(4L, "PENDIENTE");
        Mantenimientos cambios = mantenimiento(null, " completado ");
        cambios.setNombreCliente("Cliente actualizado");
        when(mantenimientoRepository.findById(4L)).thenReturn(Optional.of(existente));
        when(mantenimientoRepository.save(existente)).thenReturn(existente);

        Optional<Mantenimientos> resultado = mantenimientoService.actualizar(4L, cambios);

        assertTrue(resultado.isPresent());
        assertEquals(4L, resultado.orElseThrow().getId());
        assertEquals("Cliente actualizado", resultado.orElseThrow().getNombreCliente());
        assertEquals("COMPLETADO", resultado.orElseThrow().getEstado());
    }

    @Test
    void actualizarNoGuardaCuandoElRegistroNoExiste() {
        when(mantenimientoRepository.findById(99L)).thenReturn(Optional.empty());

        Optional<Mantenimientos> resultado = mantenimientoService.actualizar(99L, mantenimiento(null, null));

        assertTrue(resultado.isEmpty());
        verify(mantenimientoRepository, never()).save(org.mockito.ArgumentMatchers.any());
    }

    @Test
    void eliminarInformaSiElRegistroExiste() {
        when(mantenimientoRepository.existsById(7L)).thenReturn(true);
        when(mantenimientoRepository.existsById(8L)).thenReturn(false);

        assertTrue(mantenimientoService.eliminar(7L));
        assertFalse(mantenimientoService.eliminar(8L));
        verify(mantenimientoRepository).deleteById(7L);
        verify(mantenimientoRepository, never()).deleteById(8L);
    }

    private Mantenimientos mantenimiento(Long id, String estado) {
        Mantenimientos mantenimiento = new Mantenimientos();
        mantenimiento.setId(id);
        mantenimiento.setNombreCliente("Cliente");
        mantenimiento.setDireccion("Dirección");
        mantenimiento.setDescripcion(" Descripción ");
        mantenimiento.setMarca("Marca");
        mantenimiento.setModelo("Modelo");
        mantenimiento.setCantidad(1);
        mantenimiento.setEstado(estado);
        return mantenimiento;
    }
}
