package com.jisang.bangtong.repository.region;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import com.jisang.bangtong.dto.region.RegionSidoDto;
import com.jisang.bangtong.model.region.QRegion;
import com.jisang.bangtong.model.region.Region;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.reactive.server.WebTestClient;

@WebFluxTest
@ExtendWith(MockitoExtension.class)
public class RegionRepositoryCustomImplTest {

  @Autowired
  private WebTestClient webTestClient;  // WebTestClient를 자동 주입
  @Mock
  private JPAQueryFactory queryFactoryMock;

  @MockBean
  private RegionRepositoryCustomImpl regionRepositoryCustom;

  private QRegion qRegion;

  @BeforeEach
  public void setUp() {
    qRegion = QRegion.region;
  }

  @Test
  public void testSearchSido() {
    // Given
    String expectedRegionId = "1";
    String expectedRegionSido = "Seoul";

    List<RegionSidoDto> expectedResult = List.of(new RegionSidoDto(expectedRegionId, expectedRegionSido));
    when(regionRepositoryCustom.searchSido()).thenReturn(expectedResult);

    // When
    List<RegionSidoDto> actualResult = regionRepositoryCustom.searchSido();

    // Then
    RegionSidoDto actualRegion = webTestClient.get().uri("http://i11d206.p.ssafy.io:8080/regions")
        .exchange()
        .expectStatus().is2xxSuccessful()
        .expectBody(RegionSidoDto.class)
        .returnResult()
        .getResponseBody();

    // Then
    assertNotNull(actualResult);
    assertEquals(expectedResult.size(), actualResult.size());
    assertEquals(expectedRegionId, actualResult.get(0).getRegionId());
    assertEquals(expectedRegionSido, actualResult.get(0).getRegionSido());
  }
}