| model                          |       size |     params | backend    | ngl | n_batch | n_ubatch |  fa |            test |                  t/s |
| ------------------------------ | ---------: | ---------: | ---------- | --: | ------: | -------: | --: | --------------: | -------------------: |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |           pp805 |       1386.07 ± 4.21 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |          pp3313 |       1845.72 ± 1.56 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |          pp6963 |       1734.06 ± 1.52 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |         pp14563 |       1530.66 ± 1.60 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |         pp29713 |       1204.68 ± 1.43 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |         pp61341 |        826.44 ± 0.19 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |        pp129325 |        488.19 ± 0.09 |

build: 0b98ca1b4 (48)
