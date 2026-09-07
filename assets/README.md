# Menu QR code

`courses-menu-qr-code.png` opens <https://courses-menu.pages.dev/> and is generated as a
1024 × 1024 PNG with high error correction and a scanner-safe quiet zone.

The same QR code is available from the **QR code** button in Sanity Studio. Studio users can
change and save the destination, preview the regenerated code, and download it without using the
command line.

To recreate the repository copy for the current address, run this from the repository root:

```sh
npm run generate:qr
```

To create it for a new domain:

```sh
npm run generate:qr -- https://new-domain.example/menu/
```

Changing a QR destination creates a different image. Replace any printed or published copies after
changing the address.
