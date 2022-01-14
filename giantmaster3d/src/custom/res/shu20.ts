/***2019-05-02 andy 工具生成*/
export class base64_shu20{
	constructor(){}
	public static base64json:string="";
	public static base64img:string="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABACAYAAADS1n9/AAATxklEQVR4Ae1dC1zN2fY/j1560hAl0mBEpgkzkzAzlFJMDMYjdyQGce/owZAxY+aPiPHIm4xiGvcyHnPNvVGicVUUM1cPpQfS9JDSG6Xn+X+3qe45p7P375w6NQftz+dXv/1ae+2112/ttdZ+HD7vFQomJia8Hj16dK2uru62cuXnJgsWfDqgvq62P0jQQ4wMfLyXCtXU717+JTLF08s7v6Ghofj27dtPxMp02Osbb7yhrSYUGq1d+9WA2a5z+gPfN9G4sBEBAf4/rKmpiXedMycjM/N+fm5uTmlpaVmH4fdCNOTo4KA52cXFKjw87JO62pqDz6oqb9VUP6vCex0e0FTmg+TqSpT9tehR4TZ3d3eHqR991L1nz54d0ud+/cw0XV1nj8q6n7kJqN4Evs8Y+NaiTA7ygw8FBk61t7cTZ+gOwVclG3n33XcF69etsy0rLdkqEoluNtTXNYBIotY8IlFDIWCEhIR8P6FLly7ky2uXoK6uzluyxMPi3LnQTWgvE9ypEL6ihvqyxxXlf/fz2zB21KhR7YKjygPt2rUrf9eunYMS4m9uBhFTFCUii0EA696///XzisWLFmkrmxB8Pp/39dq19mDUKOCt0MCL40z6i5CefOvWfCurNzWUjafKwlNTU+Pp6+trHD1y5GMQIA5fbbU4YZT1Dtjl5WWl/q6urobKIsaYMaOFV6/GTKkoL0sEA7R68MX7iP4/+O9vv3n37du3i7LwVGk4kye7aOXl5qzCfFigzK9enKhN7xikKugGfk5OTkqRBB6LFzuDsbKUjTeYoPjKfy7PMDIyardpS2WYYs6cOf1BxKimQWrv/2CC4rt3Mmbq6Oi0iQYfTpo0pLSk+Gp74QsmSPnnT2dGggla4NlkTrTIeBEThEJhme1Im8HGxsajwQicXYCpxxMIhMV4nuKpwqMtamjgrCdWoAvaNE9NTf3P7dTUErF0uV/H29vrBgUd3tS9e/dJwJmYoNRAdATgXAE87+IpxKMOfDnFO8p0H2I5VCcpKSkKT6V4A2rikRf9PSEhQXTpUmT0W9bD3Hi8epn2mkAgIASII8/OgIDf09LTCjGIoFED39TU1MR31aoBiNshTuxtptgkTAaF03rPnt3zKisr/+98WFidojSEqTfNpLfpVIh+5uAD7/KysrIzGzduiqiqqsoGfqLX+7/ee8Xy5WPQpitwkdnfRnz4sA4+/Msc18sXL14MKigoUIjLFe3Tn1rewsLCIPlWUgQ6LKFIQS+ogDl4YuGnnzrZ2Y0zHz/eXkNadGtoaPDs7Oy0J0yYMDQpMfFLwHggj1gG8RM2rF9PGEahMGnSpP7QWa5wKX3Iz9u+fdtSG5t3DcQbgDnKGzt2rDZMxmkQ8/e4cIVfI+rtt982FYfxUr7HREd5Y1CeWwAYxGo8V/bt2zvFzKxvV3xJcvV5+LBhGr9n3Z8J4mdzERZt1Wzfts1TXtgEgYEDB/Jyc7I9CH4c8EuDDh/27KKlRZXWvXv35sfFxU4DrIcsWJAyz6AQ/g2MzpQ2chFIVQuRefLw4e9eB7fn4KsoSk9L2x4cHGSqra2tcKfHjRsneJCXu5Bo0izCkryqyqffOzg46MtLl1kzZ5pAKkWw4GJA69PSUvfCtNXigguG0kxMiP8Gg1xLg0kkDZgu4q233urKBa9V+RCtevPc3AznfvJJ8zNvnpvhkMGDOTvQqgYplUyMjXWePK5Yk5L83BHSJjNt+rRp2vn5D4JBPKYXEYRPdnZ2tqKgJJGsq6vLg/UwCTCf0gaLpMP9mwKH1hDi35AnwAqygDS6zoKJ/KLjx//hJA88hcuEnT+/Cg2cxPMPsefk5ytWTFQYWBsq6OroCJYvX64/evQohb96Wc1euBD+HvpTyCIsGKDS0dHRXlZ96TTM3Rp3MjK+42Kqp08erzU376cuXZ8Wx8IRD9PfGkisGhquRKqkp6UGjBk9Wim0kcAFLtILIJSE8kXiPj7eKyUKvmCRCY6OesVFj8IwyBJ9EycyybsQHu7RrVs3zt6t+eILk8qnTzJY8MAcd/03bbLV1NTkhCdeYPNmfyuQPF0cN+l35Mf4+vqakXryaUTiLbDfaWZQPbuaaufGxsVVPXv2jJiOVOcCiMobOdLGGOKd84vFItU7XbR1epA6sgLRY9De1ejo6CQsXcsqQk3bu2dvanz8zXSYstQyyDCrra0ZRAoomwFYjb7IeXVZWVlpGDDZI9bYs7q6ut4owlx8gcOHp6enOx5VJEw6ceIIhGpVwcFHfgsLD38qni7Pe96DB7XPqqqieXxBDaO8KfZGWBKzt5MBGFRqyqqoqOD5rv4iF86XpiTaf0JP5tw6391d385+/CCIf1a5B7W1tVjMYvIbDQfetdjYKCiQVNGBtnnLPvtskI2NjU4nA1DJKJlRX19fi5QqyVTFY/AVDESt3rSaxJeQm5NTcPHSxQxaGVY6YZotW77NLC8vf8gqh3aGCPj8Hp0MwKKSZB75YpVBLzPAabkq09gWHwxw586dzPPnw8olm5c/hvmffP3JHDX6Qr50VUaHONp5ObJhuhFjnEslL0UZmiL8nBDQ6s3x0v15RPafGnydiUQStCGQ+T+Ho74xnGMGbWqFo4GXJtvAwIAXELBDj0OzxkqdWj4UeDJVyAy2trYCL28vI5h4MvP/SOTXCNWE6YwCnFmwImrgPMpkFUQZbJwJHtrJACwqNeZh4AWvGb42AFGq4kZMt8SEhAeVlVVUk1dLS0vfQF/fhKXcwYVdFx8fn80qw4UyVgsb4oELRzkRdkibdDIAB5VINjRydXjXLPFKZQDkFftv3pxbXFxMqtCCHjJ60TIJE2FPd/WGDX75bWEALBvzsGxchHZYpiAfbRh3MgBtNMTSFy1aqG9oaMi1ySSDzxcwNW+AJFuHWPM/aTUf2jlrjiBlOINAwCc+BMIErNCnkwFY5GnMmzRxorW2ji7R3qkBTqBkuNlzqQX+yNDCP6oDqLEu0f45HQ6NZVn/CBNRfQGNFV+BjYIsEsmRh6VYvlCo5gwvMHXjH7Zp1R0MDEyJ/OUXLj8B+eCYPlrkkzmEqkfIgXJTESL+ufBR65QATeSi/P/rX5eaf/DB+x/U19WxBu5eeVl5NKQABUpzMvn6TZtjsl8eIZkTkOyqEqnkKFuhRErLiEUnA7QkSnNKr169eCNtbJx5fP7zhZPmDLEXYq9jv0Dizfj4NLFk2qs8zqTW+X9btkjgcE0lbfM2tGzz5UoZMWKE+ZSPps7C108V/3yBsALm3w9nz56V2G37olCiUwJQRgo2stDby+tDOG1sKEUgGPg87BO4uSMgIIZWRtXTOxlAxggRsb5/3743xjuM/wy2Mmt5t+bhw4ffXbsW+8Kex+5kABkM0NvEpMvQoZbLeSIRWbljhUif5SsuP32q8LI9C2aH5imVAbBeLlPpqKvlVo87tNeMxrDFmhcYGOhkMXjwZCwBUz1/MP3Kk5JuHcvMvJfPAKfyWWq+vqveAZb2eKidlasXIp5oANnsLpLiAcQdHR0mYBVME4scZEWt1UEoEFZiqfT0qdOn81oNhKOivZ3dIOeJE1di0wR1yZYsCt1OSQ5btHhx2L17mRwQVTwbc9wKPEoJUJhkbpqEH10p8AGkIjwsbFR7kRTbpHRxLcxu9APjT79IAnhkHgkOoiqHNPxwzsCOBReNigoe5h/oaWTEed6P1kZTOk4+maGtSFZ7yCtTQ6PE6UBsxrZJgKaWZfyHGSUjVfEkiN1qbGZUlp0sgQCWfAVBh7+bOXbcuLnAlzo1ks0Wt2+n7N26bfsNCQDyRZpscyp8gGHlydfKH6XkWXfIVVZjiiCmcmXJQY0DB/aPcHJ2/hyDTz01Q8y++/ez/j137txjuDSqNYxI/Pxc6wXEU8i5s1gOIpLNK2T1kRVqXnkGIIO/ZbO/qevs2X4Y/MEsamG3bvq6deu23bwZz+VipYEhPn7qhpHGSuTLVca4ENc1FyMVkYaI6G838Q/YygzKIIwEPlZWVnoeHh5fQOO3k8iQipBz+Thq5p+YlHhdKkuRKFmcIdvGWOE1ZLLWHVh1m/NwQpAwEoHFCvlqcHoQJ8Y9Vil586AcGePRli4P0VmMh3S8LYxG6pZg0+QzafitjZN9frjsaQnq/wUP1ULBvF+flXX/0GIPj5MJCYmtbY7UIw6DRxwATKAyU3HhqPs8m0g17GHQRYSlTJIpLEfNcYLTebwkPa/Zhj8YeJHfhvW7R9rajhFX+vDl8A4e2B9y4scfg9XVcRKhDYFslCh89EgpzIo9c/xvt2yZ6uY21wfuC+oaPRhXVFRUFLFo4aLd8PhxLa9y9Y65QgcS8nC0TIhLIft5eXkXkHhrgp6eHh97GIguwQy4YDKLWUDRzJ9/PhtKGEHc9CBxT89l3orCas/yRJnD/YGjgGciMb3E8RV/J3klxUU3pk+fNkIZ+JBNocXFRVtYbYJcT6Kjo2a1ZVcwVjE1CgsebhDvi/Q72XuIW87slTqn4guVKeLJpkplEFBZMLy8vKzgAPMHuuQgJRUslL6c/fsPbDxz5qf/UgspkBEbG9uwa+euPMClN8oTqcMN0VcBsLKKEuWPC0Zebm5usUoNjKyeKDvN3X1er00b/daCKd9nDT7yi/EV+cddjzunTBxw2PN3wGPpARqYkoZTvOpyoYJNrGTr2XCOwtn4YMtfKQb4ePp0gx07dqzE9uwpLOJAMlQ8fvz4W29vn6DQ0HPK8WL9r8EsvBb8Lyr5htuqyPUxAydOdObS4CUrNsaIEMalHEZQBPvILNCYiCnmLl/Af3UkANYjdHfv3uUDJWspvi6WfdwA5Shk5cpV+4+fOMHaVs2iLzUPbd9HJnX3MPnyTfv06ekw3mEYFQgjgzDAzBkzrHH8nNpHHGDhhYT8kBYfn1DxSkgA3IyliVu0F+P+QB9YKFTTiBAPA/DzunXrtwYeOkQ0dqWHI0ePVvwSeSkR1lE9A3gPXBr9JsFH0YCbz8iYjod3n9pPWOMFuC/wNg6QKsXjpCiOHVrewmKQ+rEfQj4x69v3Kzh7qJc4NRI7MiBgp+/WrVuz2wtJmJS8x4+fxAD+Y1obWIzSXLBgvo2zkxPVLU2ri+t4jHEBxXAwOot7cnE3wPPjZy+1BHjd3JyHi6MdB1kMWl/f0NCNRjSSjjkxLigoeMXar7++g7Ksom3Ou3Hjxq+4VewR7Qsnyin0FNv33nvvTayiy91eL/yWwbDhw+ywT9GMVomYlw/zH9xKTUtVij9Foh3cEXQOyEvY1SSOO4KWSxTsgAjZ0RtxIfxtNB8rbQNLx7FcHY+bs8YQD1pHBJzK1cAPQXBdEtWAS6K+MjfvJ7dXcMaMjw3R35PS/ROPI7/0zOlT05v6+VJKABzmIKt7gx0cHYnTZWRTZ2X9h0KUcS401NfT0yvmyZN2mfZbNIv7f2oCdu78EeYay7PIhx7g7uPtbSXPNXHkIuhFCxd+gOljXIsGGxOIxIFpmxMYeIhMQcoPqiAB4N/nfX/0SB+RqD4UnI/xp2/sALFyo6OuTMFGkA7/ECwtLXvi52iYF0U2egxD1q9f1402XTSNorW1dR/Ai+bobx1+ROMbzP/N/ZVbvDQ1pOr/oQQZurm5+TfUNzgB1+aOSuMNghbjJO43fn4bI8hutQEDBrR5BY60ga9blJeXVwdRK92kRBxKWgEUwtPYg/g+lFOZEz2BATxn4ALrQuC6HgpqhQQQRMi0hR+EMDqwf98aSAxbVrs4uZTt47P8FMzcZiXnpWIAcqWq9TBrD9yQNRkSgDmgINQ9lDc6c+Y0WQ1kaczSNKfGyQLT9Rs38u3t7U/U1dU3E1lWhbT0dJ7HkqXhhwIPRsE8dSD2v6wAPLUAd7Hfhg18eBGPRl2JykhOSanGda88Q8NuhpNdJg9ZunSJDzyXLihL7TMYSXQrOfnYvczMu7LaUUranzkFaGlpqgcGHvwMN2Eyb/Rkici25pG9j3Gx137FgMn9YWEb2mwMXJk8baNc/K2kpM1Llyz5G/YmfI74EUwTv8tZ9/r8+e6DpQdabkSlK6pSHNzP89vg9w6UIF+I0x5/Mm5s2S+F3PHjJ0LxszMnIQUWQgowJREG29rScoj1/gMHsPm6noe4FDTZUSi6ZdeuxuyOibmaKl2COkdKF1TlOPmpNReXD3tDzFFv31BV/C9FRj7x8FiyHV65a8CfE00yVZCBp00Z0gDwcdSkJKfsXLhw0VlsqZfOpitJLUqqeAJMKjKJyp5IVRz30HPn0pd5eq7Gr47Et2UfgHQ3Aas2Ozs7dK6bW2BqWhrZjdQivBQSoEWvXsCEY8f+HvPll1+tgaKXoAwmgNivxbnFIPf5C5bh0inq4lMnA6gQs+zesyfc33/zMqAUQc5AtBY11M0uKS7esmyZ59eXL19m3hamVCUQ881zMwTcJ4E7OLrdGQ3XuPBh/uHwGfc8KoGcUiP4VS/pzisIHzeNxRQ+Klzs4uIya+LESbPgrBoObZ8TCtEfBEJhKQ60RmDlMyTiYkTEmZ9+4tzLoFRq2dqOHAVt1hg/aNU8F5PBx9Jj4l0Ezl60sgDhLxy7MtHX13sHtGp3ZqOhiUHgl5aUlFyJirqCQeMeNRogpOPHo4XYQ2iJ3wwYDZKOAzhrJPcVNzEbr6QpQf8Tc/Pyrq9evfpKdXVNYmRkZKG8bm2lMgCjP51ZraQAfgVEgJXB17BTyAALXLqnTp00w67f7rjBvO7jGTNTCgsLnuJ6unJ4IMsyMjIUvqXk/wFsmUJTYWhZNQAAAABJRU5ErkJggg==";
}