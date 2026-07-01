| model                          |       size |     params | backend    | ngl | n_batch | n_ubatch |  fa |            test |                  t/s |
| ------------------------------ | ---------: | ---------: | ---------- | --: | ------: | -------: | --: | --------------: | -------------------: |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |    tg128 @ d805 |         81.76 ± 0.03 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |   tg128 @ d3313 |         79.76 ± 0.08 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |   tg128 @ d6963 |         77.42 ± 0.07 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |  tg128 @ d14563 |         72.73 ± 0.01 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |  tg128 @ d29713 |         66.13 ± 0.04 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 |  tg128 @ d61341 |         55.49 ± 0.01 |
| qwen35moe 35B.A3B Q5_K - Medium |  23.02 GiB |    34.66 B | SYCL       |  99 |    8192 |     4096 |   1 | tg128 @ d129325 |         41.33 ± 0.02 |

build: 885e3e325 (44)
