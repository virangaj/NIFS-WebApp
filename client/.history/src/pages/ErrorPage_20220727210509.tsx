import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
    return (
        <div className="body-content">
            <div className='error-page'>

                <div className='error-page-content'>
                    <h1>404</h1>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAFUklEQVRoge2ZS2xUVRjHf9+daSlvS7FtSgeqQEQKEgIhhZhgKaTauMGFC0NIpDbELUo7rVHKxhSKCxNjQmzFKAtjXLBQFGgpgmmR6IK+oELk0VKgsbwr087MOS7aYpn7mHNrIzHpP7mbc77H/3/ueXznXpjEJCbxv4Y8iaTzP72SHptivSaiS0SzRMEc0QyA7hI4OaTjX/SVPXvTJNaECOg/Tj+gMzYw18su/5uO1Lv3Z+zQSBiY7WE6KFp/PHvWg/c7Xs8f8oo5UQI0QMYG93g5+3vnSjD2LbDeNK6GXy0txT1vhW652VhGBBtYevdH5pgmTkTegUvZEoydxAd5AIHVWtR3Oft7p7nZJBXQ38BSLM7EUvnpxhEy3cxGHhuyvryYOaQDDcDzRqxtkLUSiFW59iZzv9dARtTiBLAMaI9GKcoups8kdd6BS9lRFTiOM/mICJ8opQ8Fh+iMBwNPSyD+hkbKgakJtoNaAot7t83r9i0A4MYRMlNSaBwjoiC7mIFxkxduE7dKrpXlnk7syvn88jrRVkOiCI2U95aGahPtjdZAdjF90ShFQLvAUHQmKjn5YJMbeRXXm5zIA/Ruy2sW9F57j37Vyd5IADwSUTCQxouhdTz0IP/UMHm9xI389bIFv3km09ZBuyuLnEyDyan/g2TTBiAaS1mCpcZPHkj7K9L9cPqUxGbHXdD4DZjiWlnuaUHvfqzRB3mAyMy0+Q7NjmfBhAsA6CldUP1IhE/yAMTVFnuj7nIydZ1CI+XB6GvrT1YmJKKndEF1bn33LyguXC+bf9HUb95nPQVaVHliu8BRJ3uvNaBNk7qhpzT0gx/7nLrLKxH1PZCW0BUhaH3l5PNEqlEnhOqvrlbCUTTpiX1aZE/vtlDYyW98ayDcmk55Z8G4fB2QU3d5pYIjTuRBmtNn3PvAzde/gKq2LLBOYakWwu01vv0TEKq/ulosqxHnbfJcLGVws1dJ7U9AVVsWShqB/JGWCsIdu3zFGAPvkdddwZgqurl1kWfdZb4GdnZkE9BNgP2Q0lLCnnx/C7b+2nMi8RZn8pyLqlihya3M7A14kYfbKDHeJh8lttTCf0seTARUtWUR0A04jjx3UPIytUsvmCQbi543Q4dF64SdZXjamJKHZFNoeM6fwG3kUZuoecH8hHVAbt2VCi1SM0xeF17Znnfdj7+7gOpLaUQeNIHYt0vNHbQUszf/jH/KduTWda9JjQ91/bF94V2/vu4CKto/Qtjh0DMhIz9RcBbwXluIuFwAEmva/4y8aS3mvIjjbMVGXh6i5GVf5Hd2Lqays8TY/nEY1WIuxZy84hCuxtecD7euAnUMTTrhtt3ULK829gVMq1+3bXShrUXitmueK8Ktq8A6BqP7vOwi3OZLgCncBNjrkrRAj1FEG/lRyK6JLABH4SbAfn0bUKGk0VzJA3CeaYPnvdy7m5na18SMpHnGwE2AvTQIWA7XvDFIRj4uhVSvvOPm3t3M1OkRfg5oWjy+ANrgLEBrp8KsgsrWtY72la1rk5Kvzb/hRSTlPpaGVGBZSgqNpiK8zoHfsV3t5CGia4nrr4laN0mVZaA2I7yN/cwwJj+KxC+AKYqXZm10/ubqLQAg3LYP5B2TxC5wJe/1P2GMiGdQrMnYSKdXEvdq9NZgJXDKP28A6UIFizxGfg6Q4dSRXUxfcIj1JuQhWTX67tlMgsFDoJ3nvnPIFiy1mQ+Xu5bEJj9ETOF9H9i3oo+B1EK07AMiSWJFQGoZSC30Ij8C1/8JfmE+AuVnc5HgFkSXMPyhdS7wJ3ARLYfRsYPsXWF22E1iEpOYxCj+BuM7GIvoQPzZAAAAAElFTkSuQmCC">
                        <p>Sorry, the page you are looking for could not be found</p>
                        <Link to='/'>
                            <Button variant="contained" color='error'>Back to home</Button>
                        </Link>

                </div>

            </div>
        </div>
    )
}

export default ErrorPage