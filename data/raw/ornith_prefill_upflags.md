| model                          |       size |     params | backend    | ngl | n_batch | n_ubatch |  fa |            test |                  t/s |
| ------------------------------ | ---------: | ---------: | ---------- | --: | ------: | -------: | --: | --------------: | -------------------: |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |           pp805 |       1378.38 ± 4.74 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |          pp3313 |       1839.63 ± 1.35 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |          pp6963 |       1741.18 ± 1.06 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |         pp14563 |       1537.74 ± 1.19 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |         pp29713 |       1207.96 ± 0.69 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |         pp61341 |        828.38 ± 0.67 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |        pp129325 |        489.21 ± 0.12 |

build: 885e3e325 (44)
