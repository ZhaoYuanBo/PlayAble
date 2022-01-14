/***2019-05-02 andy 工具生成*/
var base64_sound_hunt = /** @class */ (function () {
    function base64_sound_hunt() {
    }
    base64_sound_hunt.base64json = "";
    base64_sound_hunt.base64img = "data:audio/mpeg;base64,//qUYKm6AAAEb0JOwe966gAACXAAAAEOdQVThj0rqAAAJcAAAASQBBVAQtcGgsKc63Z+GgrhJDEBhiXEkVqKQBOHCUt62pEMmfqx5lPqtSHQ1s9NM7Ye55C4KVniZj4vZ4yNZoMpb2lOKBvZ/l/akSHOrIqciq+M8rHgRGBkb2eRkq/vm95Jle3HRBNBUlvWjkVCLLmkCxl0PAb6OIIjSDqohauOh6o4zAoGsyF2hbYqIYfnbWACSmpUAwD5sQR1oTi1cySBarzM7QvCztCgUs8Ld5q6h0rCcoM0E6TzShzD9Jcf6MlIStdh8mFV1QIH0TKE5DFEoo1WtVkhg3qaVK1NmTc1dqO0oXgaTXWErA0mmIURoVCoBTAWFYhQFkpahU2l4l4yfE9oRBAAESZlADcaUIWEy3qVdKRmCBl4YGmzqE1lvkdK11XcKHFnne6yyxYsjeN5HI/aFFxy/cMv6zU1MyXcoMCC5wqNr6pxu6SQqwEMVisi5nvSZ5JRwYdP//qUYN+xLAAD4kJT9T3gCAAACXCgAAEPGLNXuPeAEAAAJcMAAABu9pitIeYMZLQ4m5p2SV/dcQXGPWC9T11zIxvI07q+VNFh0foliJUQSSSJAAAAAAAEAJ+LqWpJDFZx6AzjYJquirLgLsJqIWYYxzxwVagIA4K9dKldnY1WMuSK91HlzSHHyyRc3YYVUMTWc4fQr7ck6WMb7laAzEZFy3u1lzEYps/WNvsbvmNUYw6QUJhYWHm2hI8HDl/WECOoFw3qzEYhESYxcgMhVVquZAh9YFtmUe2Buj46ZvHCQNjKtUkDBDrIMYkFFQVAQGoGZVYH8dFFCC9L1Wqq17VF2PR0b8nr2lZKXE5H/zV5yG/tr0fvQHMReZ69pnaXtN43EM4V6tgOQRn4Nzd8tgEEgfArvcdCyhtFcEl9U89vTMzMuST1czMzJoZNFr8tiABAjNtxtMCH39lTj232iDkSVyG9UxMFVC2lUsqWkk0ZIkVQzRztOSuqrSFN0F24YYJR//qUYJZjXoAERkjX9mWAAAAACXDAAAASAQ1b/YeAIAAAJcOAAAT2S+XJby3w0PYqUrC7cu4TVAgxGRXtMWVtjTu7Q9NShuzR2pkWrsUNjbK+dcwFcywoirVjlhiXT+7/De4NdWtmWVwpV5TocSNtKIcqGJ8zC/n8dqRMhSrNVQrqp6hAARASJqpQQ/KyeEhpLxuqdC0aphZUscESpuD6TUAwznUyFw245EIeKBQOMmZlO2Jg8zgaE2uFC2MiXTzIyw80VSiju2N+oDQa4ZBzjhv1QoHBUNBe1Kr9rz+rapXuocsOeqOMKV5BfUe6css0Y8JELngQnJSSIBWy1Y2VDXNQty/FiwD5b1YwUs8Z8ZppIlEpFEgkEgkkgkDvCDNQrkUla6JcYhbAzU6PgcGh4j0G4ermZCtNE3aKtOqhDEPWCcAx72czrQ0esFoBOjw+9/bSZavncx6h2uAfASX7zrPwwFjdqs3zECBA5TceoV//98y2CMoIjI/AhHS3Pjdc//qUYHGXfwAEZ0NVdT3gCAAACXCgAAEUASFruPeAEAAAJcMAAACOb+tKw9d+f6F0gFsilwufzEQESYmK0l/nGv//4qjSJlx6f/pwuaJVIT//7FXpLfcXEk3AiAEZZplQD+JjgkEhAy7EJE1MJUCSKEbg81YI8rBgH4eEUHixR4Qnh/LjBIP40ExSoaxpccsqymhGHVhpZw7Mn6jkH4uSHBVYiZdlSoYTn8NSaJS3y6WRslX0ax7GlzwoSD6ZkpVZleckEsP/zq222YIwNxeHg6FgqWcDkw+ZmZWNRLbzMzLjJ+NgRQgAAAIBAIBAAGjTYnpavHzRPH+ZeHBAMvO3PBVNzG6pftbARt+2vw8ig7isKb9+JP9qPQCiOygSjjRWnLaBMNqou0uO/9FUl8vaXK42JHLwoZlmkrJ7KVRrGbd+f5c3i6Ko4omOutAZR2qem1UmpVQxaN2qKGGFl62axHBylLIGoaSGqG1S42qSMXN6vQpNhoymiZrdIo3BJDfc//qUYFjUlYAEckfZZj2AAgAACXDAAAAWaSFjWawAEAAAJcMAAABpcv//+ZhyV1f///4Mf1zoePf/9Bjhd0WVWZZOeeeqQHwCp6rU7rJSEKvzAFkjSltKOkhFAnSYInMl6xcxAUrHgQ0opBhlQ5sLhylgJqpeKLs+ic0znCjzh8LiBpGVrCwRE7bvRmWSi/u0DgiUYAVI9ymz8yykf6w/tfVveO4urawFf0jZ9B8shmZmJDUl0/NXuXLlaJ5N6jgXJR9RVXvb1SvFlfhmVUfMa96nq0iKtXOR8///777PrB2Xf//y3ct1EApFJvtgmnSpoCQWb9lucBvcvIv0XCEhIci1y9gqQXFWmTHZTvKhnMlQp4/pUPYamAcalPBC4MUmaTTDCzISxlveR4qgexWuZrdxcqu6LcIrprQbArLQIS6YVFlDIJ/tqrUC4S7pTw0QdR+EsUKJL/ATjiuoqlgt6RdLEDDGrkgsFvZyeFKHALQMkTMSA4DTO9KR0mHGOt4s//qUYAgZoYAFS0haTmMAAAAACXDAAAATmRFhnYeAIAAAJcOAAATWBEx7rBJSRbXSodBoLg/5j/LgO9lQsXAhBOBJC+K5ToBHrUDo93YdhLGdWH+5qRCVrqA5TXYx2QIiNOxUMRbDoUOo7lCPVRGq7Oc8jtkV6cjHO9VEJtXMVXaTicWYKjswNkJljNyrTDhg6D8VsSdpy6Vq6eKpwcknEULAppoxVq881yqEmqC4jeQap5on8YKEQTOlcy24rAcjLEWh8iMqiqgyjJweBpyHKEiEVbkSf43SMAbATheFErCdvVFEQ+iRol3En6fMaNhrgMC2ZDgbyQcVGTYyj1TTpKnqwGQyNritYuFsXjcnU09XhOXzA1NEhWMYCK5Q6qapFBXN0zWmJJRRL30ET2myeeEg5ehOyenP3z11Aj0scrZYHAkoL0RUJJIWdAhrmq2g7Ze+EiZSSBw5cetSykcrLRBWVq//IjCo7Hocib0rOUEQzOIQgaARZ7SAlAUoquo2//qUYGCBqwAEy0NY4e966gAACXAAAAETkR1nJ72NoAAAJcAAAASeaIDgu+8zK4afmUSHBMR9UDIZkT8uIyFeTwSN14Q4ETdhk/X5gmSO/gKgl4/Fe+KQL8I2hw+3hxC6hVi1F4Lwxw0LJYPxQntVWJRBj7JuSArD2IIeBysaEMsVCzmhHCzOCST6RS6SWGVHIhPl7V7Qq4CHt/TUhlneu1erizgtqjeKFjV0CJD/zb61mz6DCJNK7dKAKtPhQOWselWQtsSLMJEvo9x/sCpJ0pcoB0wUgE4xaA8IxDEvETRRgodAcTaLqyqOr9bePQZANDIEjlIMjbE1hX5dGkPw3yZDjJIwKsdMRWYSq3IhpM3A1jiJapCsIQELAXAryrL4c6tL0fructphnIbShim6OI8UuzFyShe1KQRCUWXXaXua8XLwTkljkLiNBtQpxhEyE5E1OM8EsozpRxeD1N0VQsAr5KjxiuLPkJ4T7gww1Z4jJCdPIXEIyOxxVZ1hoEjT//qUYGubvQAFl0naSxh7YAAACXAAAAEWFRFpDGHrqAAAJcAAAATj0iUHWP5WDeHKZxfyMIWSU8YaVaUJXnz2Cyo1Sljby4mQ1kJL4rCcN6iPlmVDisvFRw8bORHFp24VTcRQ6LqSrxxY4QUUawuRGCQjNHyJCO4WG6IZgVnLE4v3iTwHvEEupyYqeWwUJ655959evVD+ZnIobMXMfaadRqH+tWOPvtgXk5V885KpVCVlpUZ8SSNW1ubKET3GbjKY/i8Q0Kqd4WZEFvQL5BqN6sOJko4yTGNB/KbJwFqkWVwQxHIVSG3EwKxDjKWF5oL6dBOFxmIhOKaQeyrCDRdC8ToDwG5cbEwslh1s1uUzR1h5YvHoxUy8ctH50HxgOKtCLA/FsXaLjADJfLKVYJpCV45crNKIjJfx1c8QH2Yme9fDztMjZ/JnNbrSAJhDU+PoVQVpJJNuOUA6Y+xeghGjegEQci0gc+Vt0eNgZQD1FvXEYlBMRXy5BxEbLgXgsC8L//qUYKPtuAAE7klaqe9jagAACXAAAAEUSTVpLL2NoAAAJcAAAATToE4FyJCcA5z+ZzzXzANBX3UZPEuyqxBrlkNxnCcP+erMqVnVyC9MBrA4upZ2i5sppzFcbCKfkgzqdrBNFR2+Kia6hK6Fn4cQnGBxPFqdqE5Q4bQmT0Tr06lPvOLZHmZGx0wMO6847ev5bdteZZbbhJpPAa0q1NSi2ZhelzCwAAzHCMsQYdDD1NalzSXjFkXR/ghA9iRk1P4D0HYiB1FyUosUNlH0vCJF/YC4MRboKFktVqvVJ0K8bomCEq05iWJOAxKoRHcp/EsvlonrhxRHVsbqPSNL2JG2GvI0K5QhoJofrXmSakxGfN0eMcYitBGdsnawloR2wzji0rPIZdZYcjy85BR+C8u06zDyPIHupNoG34GWRS5ImHr/6qosmWMJBAEalRofpyvQtdda6FYoNbKtVwOYRBDjMXmkv51rZRM7eqXY7CfGkmENQ5OEjNNBF8UCMWBxH8jG//qUYHNOxQAFIVBaUw9jYAAACXAAAAEUsTlpLD2NoAAAJcAAAATFBBLahE5w2TgLOoCTCwJRiDU9HQuXqcHT8JSLJeRwI4S+0hwjk2eoETTbCYtLyeVES1CmMyjboaMF5K5Ju+wtcZTvrzpDWwJPJJe2W/gYYdmkPXgapf3bQfLcWu7wnI0nyvLezWhRFJdNF1gaBoBKXGVwztbAAGhg1VWxPhANMiWF2FxZzHeE7CVARAVJXKwWAnCRiHgZJTOSIA0B/CFhwHWymWSxPpdjQwvaLU3biUNbsyhJQiXEC4JpAqYZ8dkToW4A66xwVtjZFQvcieZePJNMjROWI0S0SEpBCuTMuFciO3rywqiQHScVrZz8rSWbUblOM3kKk1cMtJVSm+c1ZG31+SOlG1glVWqaktQoWvASBPSFMlfkOQM0wQAGiyLJwA6RNRYmwgZukiO9oJBk4VkpUfkL0P0QYa5NW8eova8+L9lTKpxMk5jSM1lbjuevJVe9zWOqVafx//qUYK/BzQAFLk1ZMw9jagAACXAAAAEUEUFjDD0toAAAJcAAAASqhLWo0SnSifMMJRqh2xwXJk0ooyugKJ4tQd5OqtNKJV1RrB3kFsh+vhtTfPI3QWctsKGjGJsTaMVSiu0KJSQYS5zGeYjb3GlVLVFi+lv7+sTAdmwVVix7rAAlpru/sMxiDXC+Uuf5ardF4soeIRTOxTVM1FTUUuh9pdJOuw48JjipnYiEy37WlPOzB8NwZVhydjzbSuA3ZnHStO5hM8h5gitqOZFa2qFiVSeL09SSrh7T62l5twZHNxSSCZRwoliTyVOlAaT6G1a1Ru0NsSeXyWfxH7XidxSavb2CR7p8l4Swhq4IOkZj/VUr1kcWFwjYhM0KfdbQe+9a5fbg2LaQ7oFni666iZJJBLXVAJRHoIRkLSwDYjAFPSc80rhp0mlKmpppuLJYaaBDEmj8ZYnGGCO+gcUQXYkWhm6jor2Yo0VwI45F9Vzm3NbuAuiMigCRoov8M5hiDjNy//qUYE2K1oAFXk5YSy97aAAACXAAAAEVmTVbLGHtoAAAJcAAAATxSUH6OM9kIDjE+CVgFhdR1k8NRLrC+ssyJzAaGk9EiuULJAYgr5MhXTjHoDnJQX9a49lklZOh/kIViDOwWw375shhrtyVJW7KQZ430GORMpY5FPaJjtIAAAn4f6IbT8WRPEHcu5wqUEYHGd4wS/Bzl1UqFC6rhOnUKSKNCSEIWVppDHCOmgXJFsawSdZQ1WExCvDLL4nR6wjYX53p0cA0B1JJOkIqZKLLibrMdCFJEyydiFKoJCSMxR3JCCuxNTtOdOl9PhXnWsn0oh1MJeUNK5L0bjRJ7ANF4g0+5DeSrKpUikEEaLIXZztQcR7LxcC/IU3C4xiGXL8XFSRmebT1oAllV/2CWfvj1SUpKlMao/BJGAJUbrUEcFkO5PrgeldlCaIyFeboAtUgjZiilC3H+co7kgYJSoonyILCly6gXhpCjEyC9EdIKeKMSxdR8m0+L8QqpRp5PC3M//qUYJaj1wAFTERXYZh66AAACXAAAAEVLRFTZ73roAAAJcAAAARQxulxShNRwl1cFcS9DEJFhFtFecziM48IpzsaEolWvnimH8+Og706Zp4EsZjmVibRSvQ4dr5dREUeDUQKMXdsL4i0s1MTCK8+Pw5y8zN0+/WgHIkk42mBFnjibtyqDJcimxMivDqKrMHcfQtKLYVynGRdn2OMuxuE8BuDrKYwQb4t5bxvvSHGEYovDzQgWMd5cuqTTaBalKTBTvixl3HeoirJk5lsYD1UBiFiPdCSXDFTyaC8XBQhXhzsB0QTTNAfpB3FgqpSVVHGj3OQeg7TBMdSnObJVDsQl2S9OJxVsKMgJFkYTygGo1OTmPo3BiE1PNSF6E3YzIcNZnEOEohkspImlVWpUC60SqwO0o6quRFQQNF5jKREzM7l6x3AakbbKm/g6HxfJ+2xHGHhoRYgvJWbgoQRwR7VOY4EICWXF2RIQS4sNaYPE5WwZf8aaUwxBt9GTRd/asrm//qUYJPR2oAFWERVYe966AAACXAAAAEVcQ9XtYeAIAAAJcKAAAQgSW00WjFFlTPzN4yuVSKkjEMzlr7WVy1Xuz1X/+nm/sZyW9PyLm43n2zXxmIzflN+1a1YtzD80cPzUnaDhulr3v///d6QT/P//+LSmrqYIRAhESKbcbAjUFPVWbCuVFFtQQRAJBmyTJvupgJBfRWESlFhGGoOIG6PoQNDzuLEKpXEYMwUYzjM6INMRYZ5NmNvE0LoeybFgKpwNJLDhWCaCQkQp0aT+htUPqWMUoubAZcRgGSzrcV5MqT6UaFlgc1OdynLeXBcn6KQMYniHEIA+hsoevEGYhCGw0l4/0JHCbg+ypElIGO1rOuCsN0y3pkXB+CeK5Gv2VEjDVji7sPMpzEQEBEq+6DSKUaGHKxrs9idGMOgBFTRDGjUEvmaxAuCmIgEYYsPLJ5miq+cNNOfaHpTPtusxUrlMLlkbfZ/JEQofB4IxGGM5oaJIP4/jILcYJLWaKPmAnUQ//qUYFUZ3AAFYEhW5m9gAAAACXDAAAAWKQ9X/aeAKAAAJcOAAASuQmEhhuqEuZtK2dvRrivLhZXdmCFEiobBUxJVWn2J+kHI0UA1oNCz/WmwvCcPpXNivOtBJ4yDAb0cZJ2OzJJAkGyIXE7EKFhGUV5cV53vZIgABESr/oD9UaEuaSLkapOW0RdDgbbvKUQtJ9EllZepVrqEQQ56Xb9Qhe7pKTZMpm+TrTjF1h3zbVr7dLbqQay83kMLybxO0+b6rJ/MSFDSYpVfZz/ZYykOVSlgWzeKdpOlPI0SxzrIxSbiYp8cpdFplRJGDSQhiMmJEip1J15dXI8DzSYmg+wjIjxBymUJMkKhro0USyI9adj5H4ZRCGhRMYnKrVZqKvw8JKggABABJbqgN1aSyMRA7nAqDgHMIITU9wUrcFRRy2kpNPXAzN0j1PVC8bsDXSYi+S4ai8ANfkb8r79zkh013WXJJl8u4adUMYVWvubAl0nDKMlZQu0YcpcUeToujQ1n//qUYIXp2gAFRkRWcfh66AAACXAAAAEVbQ9Zx+HroAAAJcAAAASx6DdEyRSVQ85FK1M4mBfA/8D5UhOJSwt6CN88llabxvZK4ZBDQchLFwdpODII4uDwb4+yUEwF3Kc1TJJKVTYfK4R6JPMvpvUE4IhLeBDr6QAACipVCKbiwh8cvjeFI2lhjj+F6Z5Dx9lhSUI1hvk7VaGN46xIR6RzliUhFFhSK0ozmPxSi3knLCWGiTZzmw2HspEJwaaPelueiSCanMh6KGIZZYi5oypsuRXGsBqgPoXUYAuYjA6gzTZMkZxSKAd5B1chhczULYSlRw0GYauMpC5kqokNPRpOk0TMG+4E8M98jk8aZMA4GM8z2bCwClmwUI6zmRGXOSTVhRAAEiEVqmDB24w46YgVSisnqNaFjGYZUIJJjLEyocEaUQUDwIDoQjJsQsKcFejSX0HgVK5bb0kIgqmn5YotIF7vHPy6PwO+hUvCaLCmSc052HwezIzPEecSnshRpo9A//qUYFoH3IAFb0RV8fh66AAACXAAAAEVWRFZh73roAAAJcAAAASj2ZOJNUk5YUCLCYSrOtsQw5Q2CYKcq02YSiJeS1dJw2FehbKhDYVygZrmQhbKr1G+ncGddtxoNJ3sgQcYBkH+WEZBKCRmklxTES6fmRBjTQpAIAICJVShnAdR6hUQx7maSgAKsvZzC09n3bAkaIZjPsDAVhowp1G3+jjxPaiIgCY4g9AjrV4YgpazIpS3z4vlIsHJjSi6wrBYGeHOLOe7cVe2AW7PjJH7uRujjqlbGoBZ+zNuEKn3FrRFjlLAzSoqu5k8mY3DlaIOU8z6v/ONhZZBjzT9tplNJLU3KmsNSfhb7WW1i7xpaymdZkoEsuDlMmnpCrsDnFsnDGisuhXYTOQalAEQAREmplCOv3x4GkLJLMKHAlKCVqcWfqAVFhVMYiBRKeKtyttpd73J5PCJBGKKXkRYh10YW7lyEujuJP23Oy98XQfPVMmM9bx8KFXRzwQaWOAgh4Nq//qUYMzn3QAFf0NWcxp66gAACXAAAAEWVQ1XzOcLqAAAJcAAAATsu6cVSElAljw01nKThPmim5kMXT8vZkKOjxgUqINBNrD6E8cDnVRptWzFUyPX0Y+VEdPIhFrKdVhxGieKgU6sTj9tjK9FMSKfURzuHaAAAAiIq1UEGv1HoAc7q2RxY9FspfNtTaJkcwJ0L4mxgCTCZt5mncfA3kyj1oh4VozRDEPLgVx0hUmScqOMahvOTwYB/jPQ8uCwfhLFWukUuyBsZmD0JUtxpN5eVhhaz9Qw0xwGibx4H8XFWrlWqVWzMbCqU7OznYXg2XqJYTpeKxYSqHxmsb6qhpEbo4VgzVKOJDiSPnEpjfGqeTocJdmQvkBNsi625XunAAAREhKqYMl+aVUbqHh1hqQk4rx9nWu9QxOh+Y0qqODYKsKyZ/HIYI0xl0VWUXaZUw6laa+0NtbZg1l/rrXWnYRxOFOXQXE5RemaaJKhd2FXriOhaZLijHx3FtHpYjuRyvTK//qUYK6j2IAFHUNW8xl66AAACXAAAAEVHQ9ZzD3roAAAJcAAAAQtkUinPw4kIQacQvzGgr0MrEUycNE70ipjTSbalENYFyzSl/79Vwl4x2wsNWYsYQQnQ/FwlTRI0ZopBfyWimjZPUgSaKxSVQoAIgIkN/dBGHd46ac/GUMhO40oQMtK5vVPxhlTd0kyAjiKwQ4KwG+EMEQQs2SyTySN0Iyc49aElGT1kRqjUx/KwdA3C3PTwGwulUX1DC6C1tCdZXSHHgnjkVjcil0hzU4oQahpE9RBNzcO06HMm0I5FelzPKIdbai0yWNTGirXZCjpOmAc5wiGj4MrI9LmUB+WNFEJB+hhvE/Qgdj0oTg2pFOXkGKfh1Q4AL8VVYBUWpqppoB6xwvgwyg0ipoq+DlAwkbMKPSgcMJHTIBwISEZgSBAAbODLzLTNdzGHnRYEYSrTABeEgFA0CDiZ6qKfKODB4MZuztHFpSry3DQxVBAEuYvikaleY+ILfLhl1kvRgsz//qUYB2T3wAFV0NWcfh66gAACXAAAAEVcQtb1YeAKAAAJcKAAASPBLQIJqtPg182tXgcWzFHBIRJBgKKY0K+iqQsKHOv4v1MWGEiIacl/nqAxYEAkYKIQXNEFLsmSb4MUARI1RFX8pvygF2JWmO+AUGjC5WYNMAIqSYGSJAQUSYxCQVIvZmTB2vuXL+f/+ie1stmEBqvln//iMYz0lkqhcrGQEAABERFlUJc+8yykAPL8OfMo8pmIZpkN+vZ1H0ZjEy+H8zJMzVAbyuRyrMkzFOqFs7R1qQNIvQsSUV8BdIaj0gWwvkZRWc0C/OpC9qwvJxnypWFwLGQZXF2KI9DMKY7Euii3IMuZYYbGoyZmeW0v6XViBUEWbUjEyLLkunTLDhJFRpc/zHkbydJ5XKWUxmxWMiTYW52aBzHs3tVquLbM1X4AkgEiyqEdhVDBD/KGKwLPABRgmHZQDlDoAsBsGEeQuqOYyFg2huksDKHCiCBiNochY40MGArjjO0G2Dn//qUYBHq4IAHFklUzm8gAAAACXDAAAAUFQtb3YeAKAAAJcOAAARyADgdCAQ0x12hsVYQuK3XhxEYcZ1n4fjMroKfaiKNlUmkpWWigLiq6Ls0lGpURkthxvasUZR51IxPEMgqpiV6xs52NDD2pHb7qZWFKddjsQbIg1jrRwuZ7kILYQdRQbr6FwnkKAAAAAiIqARF5MYOjLcw6abS+0EjSjYMtjKIbhtSLnJ1PuvUMM3EgEl07Cgz4A4Stbmyp41LGdQ2hkXpZOijDSlzcXNJ0oWR/IczUr4KdkXbMsITZLq9LnkpWQvqnQtqUrSpzwZEzZCG8/kYzH9dxZGDCsSLWrk4/Pc51wplCc7OWyIdb9Tk2ak2Qcm90MJQNxmIOgCTD8PdVL53mk1sKXUZfVIdEJwq8AJJBIsoBWfWmgppSqpZxuwjnR9MbFKMRoK8pAugDEIcP4aarArg37DcMwuKdUIxQxDebWUszuEYEyNElpWqdjV64OslxfGxXv1pvPKC//qUYBoLy4AFBUNXYy966AAACXAAAAEVCQ9dzGHroAAAJcAAAAR1JE/0LKREOTUoUOLa1JZFJFRqw7cl4N9wclYO1OItQr7IfB4mUhiRZ1MrE49MtInkhisWXSuRRlIWkz1LczcnKtUMM9D+yoSxE+fm+so1PknV5NT3nYIYBEAAAIkRMzKCmLYsnMdh7EhYEAbxQqhO5k7DmDTqb4o0uwNGRwIhoSWYu6lUgQDgJyRaXrFjsHoWjAYeXos5N1HZyXguflTodDDKosEct3jj5TBllxVKuZTUMGpiJtzZlylnxfzQShzq865VEqsVJ4lqkzZla1I5GN6kJKglSZqMjxTpMIzUggUcfKIaYp+lvQKoLwdKlDoUY7BbUOKgk6LRqGk7PpSq5YyPhRERIRIlpQDFyqd6ICk6cCmw6AqiLcA4AhCAqlUMMQamsmG0tTVGZdSKqJyKCdSz9iygdwKhh9uLpT8nhEbY45Vh44vBTiCUioYmRigltHzGPJSrRJWI//qUYFc21AAFNULXYy966gAACXAAAAEVMQ9fx+HroAAAJcAAAAScQ4S0eptlIPcvw8UkOsdinL4kVEas4/HseAeBfO7RKmJuiGhpc0JLcq1OecdqPUyjkU5xF5TipO5nlRUdcE5FAc55nQdJjFKxIe3sre/V6mZ5r3ICJEREVVShBE3G3t9mLLGUsTnFSjJiUgKImmslYUZesInKt1aj9rmRNWQ3JcudKt0vs0dhz1pVvpcYe/cJc1oUOjHLkZxPzkaThTzEXhhU54j8Y1YerY4mycRdxckqliaoUbShHKj4qIHpSpLzKKwnhLEE6EzJ6rC8p0uqfNtA711QWBLro11liNMmK88UZoKZ6cS6UiFGgW5kbHxIGtCox+trmeiPiQhHqQISIiI6+6Cu8MXdj2jiwi80NJ8MxEVUUcTQkgDgbgbIuAjgtb0gZhrrQ/zsJkIahaw6G+eReEuS4uJOS8VEdVqnMJRFtPpGmisjGRS6WkPLYbp+niTRPrJVKQsj//qUYO/k2IAFT0PYcxh66AAACXAAAAEVOQljzGHrqAAAJcAAAARZCjsaCnVZNjyO5dk1ExFxDEPcmIcLeSwtpdhXiSk9RQZQoqLtzJUqUKqN88XIXdtJQrU8MkbMEuL84C2l1MEM3RfUrYkCrJA1pZTEiTzY+t6iASSVZlBqRilTphoaXWAFpFlGGEWUSU0ZItZVVjz7QQuhMwZExfbKVmvI61VS6RNdajAmDsw0yaBHMclNN3z8DOLCjzVOAuzQcxcy3KQhZMw2mVIFApW2KZ5/ncTk7ENTgxCmOgsAvy+J1GFIaw+yZHgoi2JgRQ2zIRZ0HeQNDiUn29yvn6Tku6UMcJGyTGqkWBBKWMjXJoazAZDbLmWY+0OTqBTspyrmBGjWlgEAERERUVBMIc2nSuyZA0k4fZmmeMeD2ALqLul9FSJbChi5YAKiS4SzUzYCcFYB73qlT8touF2GbKXyx9EwVIu/KULKw3SREiHkhorqGrMg4Eiro5/Hobb/87or//qUYLvn24AFa0PYcw966AAACXAAAAEVgQ9bh+HroAAAJcAAAASBrshdZ1ow0mlSPJkHGCmFSGSNsJwGmMAlYWoUKbMdSnYpOi1hpoxiznuh4/FQr0GTsehQtpLCOel4JyhpzIYWNbQxyXJsGEa6QHwp3x1IQ2dFuQAAiIiKqIQHk7Vh9XbVXZ+oemoquSJEREhiUQt1MRfzcE61BGvu8mKhOTtfiBXHd9TR9Io/rEou9TK13o8qGSVh7EibjwP1dtisMh8vI5VJBQsA+2JTvjiV60OhWCHF9TheT8ZDyPNloZL3E5/MKgMZClxKyl8gqFOtR/vUW0xGdmNNlM43KriRQ/BoOLUcpmm0JqXIQYyiMjnLkUwxwtRpELMlTEuTcGKLlQAAARERZQA91XVHvTcJUf5EkkIoTuLKMSkmuxVOILBcVUSwkOLBtBXE+613aZEm3E1gGptNijKYAa82iuGuKjZaPs5kyUKqQSTnVIkA0A0h0k3UiiekqJQM0XI9//qUYKXu24AFdUPW8fh66AAACXAAAAEVUQ9dzGHroAAAJcAAAARUq2i2xdDkW1pOGKjEi1E+LgS48joiEqgDhQguJHmiX8kwagfhgiT7LguSxR1yXwnRppEtMxlA5QjWPZTISqi/NY1B+uZuKM6CiRh9ng2Q548oAiIiJE1UoKZMLk04xMB6B4g8jJGMK6Ss8ToRZYwvW8J8b8EWsGgEhBzDiC8IAc6Fj1pNeQRDmUuCkgspgHQhZCm5OqkbiuLkcR+HOcki2+OQTQqkerZUKAYEJZRNjREkSAyzbOggZ3HaS4liiQaLMY5lohiWSyhV7ehqhMqKcLilxxNysLwj6rL4cx9otSMA8DgPs94pO45YruKGronh6tuSEs6vSp9TbqcAABERJVVAfHqkUJqdZ4HeJ6byHOLMUxocX65CRa7WMIgNKViRIUfLmpwCAq0UKWVLWehO9U7SETEgXXzcOCXzec+DRXK4yYyaN87DsZHppnI3rhHJglcpdkCaR1tC//qUYNKj24AFb0PW8fh66AAACXAAAAEVPQ9fx73roAAAJcAAAARciSuO1MohcIcrDjF0b3cUxTkgGQeacQ80Bvtb+QYp1kgJSZJOxMAgZfkMHaQZKG+NgLlpCMF3fI9Voa3rgtToP+IXFHl1L8xsFmjjPgCCAT+DiknIynM2ohxjFLCc6NGRt+uS1RtjbeKSFE9kKoGIqr9ibfstLMw3GgIAvuIUoJUby3QiEMhR7Z5CCPDREPWDcAewW5/CGMAmGh6y6RD3HWbZwqIuJcTcGoriFEiQlklJmqicEhJm5F8J0rB4HOcZ8D0IBVEALVRLZoK1yel0MA702hS5RhLmM5T8TCSkEKOYmJVma4M8WV0falPocJJlQ7M05WjLWLGFIhAQEia6kG0v7Ghy+myVgaqeQI6i8O2oIn1NruzV03qe4gkIrggAG4lO5K6nJZ1A9t8ZxWdoqNSllM1FWZUzks7UezmNVXKJoJq3kKFo2N9KoyALsJqQgzS2Hqkk8i0U//qUYIcp3IAFWkLX8fh66gAACXAAAAEViQ1bZ+HrqAAAJcAAAAR+F+OE5ShUrtTI1XPIaoPA33FQqVGE7T7kTiMT9SowTNHFyXIpJCR6jhRo7DhQk+CXLLcYAsK2lIJjyBmrlmUBcHqOLsqk9BaKQKIiEBERFrpQgCGNuOBBBYb8NMEjNee5xVDHJaG8D7uunKpWilNqZsOKgU/E13IZC7zoKOyxxnIkDUQsRFFxY4kitRLUkKeLC4wUCsODGXpD0mW8catV5Ii/PjlNtvPk9UiMEpxzCzDeRL24PscZ/nvtdEYXSoKwvySfsKwNpC5nN6hDpjoYidZzHGEbikIAdXHrRozCwFiMo6yxvnMtpnECdIQvKlENSGn/CcK8giIAIyI1G22wLr/bdlckNhcy8KNmLmN+XnXStaJvXAquM2cr0glLxWd5XiXk6Tqx9g9I0x/I2hQDrAQK4gAEwiTDL9CumeeCneIpiOsvaReMkEn570Pc1okJBDMGadSeP9Fq//qUYEtP3YAFWENXcfh66AAACXAAAAEVjQ9ZzGHroAAAJcAAAAS0IUhfrEGPtWtSklZlIYTAiTSL6RlWTq092pBq9RHCfo6R0i3E+RyNP4sR/mi/LquU6dbcKcXMcDwXRRGhceayJKN0R03lOYzlDsQghECIhIqu5CMlWw+CeBqwvwL5awS/IUNE7Qw9jdFQXxKifg0DxMkV56mDvNUOoBtE0PIco1T3bILNgSZHEaFyGyQ90N6Gxm65IZc4qnCYZS1LAS94lh4+Ckxaleh76iUVyfH00ohXM5LxwDjDMXzsMEk6tJAcRNUtYjZjF3FLKYkYbwpAaZCCXjgBdk9HcrTkOAtgaoxDGJ0qE2lCRkqJ+QIcpKz0V6liI7Ljt4YRAiEiK/ugpn/f91PYgKBZkmFRPCOLLNmEpe951V4QvSWqllBdJdjuYMxdyDfmUqkJznOZGJYvlajzsUZG9UNivEpOdeWzvil8LFKXEvKOOY9I6Fixqs6GMQk2Um1oN0fq//qUYGeB3oAFckPXexh66gAACXAAAAEViQ9bx73roAAAJcAAAAR9RZQw9l49GMuzAS4yyuUS2fo9J4nSWFCTbyyuJ6qZlHGfw6mI4kPRqDLsSQa4synOtUFAgi7Lk6FHdxHcMUsLIkihXRjqiaGMggAAABElqlCGl4xPDoADxLhHAFsGqcgy4cLvYLubxgYWQuVKhjrhKfWhKkhmTvzL3Cjau3Pkbb4SpmK7opfvseN96fwebIA0g006bLIgS7HCiS3m2uzMPEYQ2lIQcu6iFnIUXEfY8YpPjAFdJLGIedyjVS6NE4haVKjC7kjU1FSeRVFA7fiUJ4ihA2w7jbjKAkxhkgFmIKeR9j3DrIskAXBCwB+ngrFKUqpIyQc/2CPD1ZMAACEiP/+gT6Aa0W6A2DtJcJAk2AQ0xkAYi6jd1MlhnYUVWLTsTYq8F1dS0pImlFqtlpkNs2oWvvY2BdzSXbsxaiTGsvMRCiZG2L1IFuQsvKWLgdCjeH0lSiPOI3dS//qUYCVE3gAFWENW8xh66gAACXAAAAEWNRFTx+HroAAAJcAAAASyqpXktOOV+dQ5W1VmscLYOkUkjZ5C4iMGgOI0C8FUFrL4bY5SDkqPPA+2d2aTSPSyFwOYyj2LyrlyhJbRcV4nwiSEu6I1PDOTa7U0gX8iQVJG5G0gKGVEO5REgFLZ0NE2nKeMHWfx5NIwSeK9Si4jzMcIIh6mDoNxMEIJEWMy1SknM1MtySjrxAx3KNKIonZezCTJDz9RKadQDrjLlD4ZimynlOn0JQ1WLhJoQXk7o7ErT+VxKUqh51FkfBllhRR7i2lQtR0adK6ai4ivKYyDPVqbJ4Yx1LkR4etYXQ/RRikD8JeCdE+ISEiDpB/HuYtSNj2nT0K8KfiQASk1XIRT9S6yykKSQapREcCmL+xtQ9/XufVYKXMuZEGEbRRt2kyGHQY8jbNldtzlktIUpZwt5fTM2aqYz78CzznuMIfrEMFPKEfisURATKHRBjtDXGQpVKhMuQ1CjLEU//qUYMFQ3IAFY0NV8fh66gAACXAAAAEVRQ1Zp73rqAAAJcAAAAQi7KY83FKKo5EUgUQJmPg5Fom6gVJuwCPS4SE+j/sEqCGFyLsIaYoTROh9C3kiL2jTDEZGMcTUq5hQK1lRR7qw7RI0DQZKGOjlgOReFIBASIzTccbApXugxMhZDS809DQw5jhtLR+IaZynFrVhDRNyuECFvJsjUaT2pIA9FjaiqMwTYMI6kYdaCHUaRhMqMOZWo4uhNC0emuX4ngkpOh+j6cFOjtGsghzqlQoQdR5EtTJcUU4o1YG+lR1FOLYShcJ4WwyQ/SmNYkYsJeTmxBV5TMgz3xMhjJ4uZlH9HNQiCwkJObJeRKTGXWUtiVIQea0PpBPjwVaKjLYnozAAEhI223GwFSiZUkhxfUkRQA6UIMUp1SryXagJcNpMSdpQ8RieZiDvxhurdFzPfGlmoRDClBQ6aoonJpLBeEJ+Ch6mGsLkPSN2GlY4kylfNq2qBnkTZ6EeNQwA1Tgv//qUYHeP3gAFbkNT4fh66gAACXAAAAEVwQ1R7D3rqAAAJcAAAAQcbpInSumdwShACSF0YT3RcUnb0wS2ELQtKDyTRy0OcWKUoWBzUxfyACzIMcR3DhJyjkIRasiI/CVjvSdoQkzpM6IOUjJoDrPVURrt0xiACKESbjjYDMkJTpU45jvK0R0W4awxW3QQMPWU1VnNh2boMmxBsEEqrQAprHopIomt2uv5tFKmspEtkb5iKw0O5INs5g/SWFvLzQ/nEgyuOJOGmIaIaTwbgdSDuQgDSUJYjMCQsp0nKujlMkfySNFWnKrIq2LCdRKT+L0oDrQiPCC0jpLczO1LDLaZhXn1A2rkork+ex5piAQZyYswDSLkTo5YKainuWFdHVZEMaTIBKltbQFargQ4XUBZAdRQgOw5ghJ0mCYQg3idoEgVE5S5izxfs3TQMUk+QFQmquVwFRJip3IHF1UyDYVtF1MxdxzkhWYF4i6qzXaplbmLM5j1tuquaqwsgbiwV8C2//qUYNY/3QAFYUPT+fh66gAACXAAAAEVsQ9F5+HroAAAJcAAAARKoA4SToOKzKTrmeOIMyfdsDnstSOadAMVyuv7RS7GGrcSqTMxK4rWyoXJnpp3p7dnspqWYi7sca9R6mYdry3n1pdTZ0t1/aR/r+Mh///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//qUYHHf3QAIp0JJafjC4AAACXAAAAEAAAEuAAAAIAAAJcAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    return base64_sound_hunt;
}());