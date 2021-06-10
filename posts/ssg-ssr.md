---
title: 'When to Use Static Generation v.s. Server-side Rendering'
date: '2020-01-02'
published: true
---

We recommend using **Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

You should ask yourself: "Can I pre-render this page **ahead** of a user's request?" If the answer is yes, then you should choose Static Generation.

On the other hand, Static Generation is **not** a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use **Server-Side Rendering**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.

```javascript
function foo() {
  return 'foo'
}
```

```bash
$ npm i remark
npm WARN victorze.dev@1.0.0 No description
npm WARN victorze.dev@1.0.0 No repository field.

+ remark@13.0.0
updated 1 package and audited 78 packages in 3.4s

22 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

```css
.foo {
  color: red;
}
```

## Instrucciones

Para probar la aplicación debe usar el usuario `qwerty` y la contraseña `secret`.
Puede crear más usuarios y cuentas en los métodos `init` de las clases localizadas
en el paquete `repositories`.

## Artículos relacionados

* [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html),
  Robert C. Martin
  
* [A Little Architecture](https://blog.cleancoder.com/uncle-bob/2016/01/04/ALittleArchitecture.html),
  Robert C. Martin
  
* [Inversion of Control Containers and the Dependency Injection pattern](https://martinfowler.com/articles/injection.html),
  Martin Fowler

* [Inversion of Control](https://martinfowler.com/bliki/InversionOfControl.html),
  Martin Fowler
