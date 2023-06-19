# Proyecto desarrollado para Hackathon DANONE 2023

Este proyecto es una vista de escritorio simple de una página de inicio y una vista de productos desarrollada con React, Material UI, Contentful y ApolloClient.

## Inicio del proyecto

Para iniciar el proyecto, asegúrate de tener Node.js y npm instalados. Luego, sigue los siguientes pasos:

1. Clona este repositorio: `git clone https://github.com/IsaacVT/EcoDanone.git`
2. Ingresa al directorio del proyecto: `cd EcoDanone`
3. Instala las dependencias: `npm install`
4. Inicia la aplicación: `npm start`

---

## Capturas de pantalla

Aquí se presentan el diseño del proyecto:

-   [Diseño en Figma](https://www.figma.com/file/vEevEJFIBEopdUGZzmlKA1/EcoDanone?type=design&node-id=0%3A1&t=TfqllCMJIEXMsqWP-1)

## Aplicación desplegada

Puedes acceder a la aplicación desplegada en el siguiente enlace: [Enlace a la aplicación](https://eco-danone.vercel.app/home/app)
En la parte final de la aplicación, podras encontrar el enlace a mi portfolio para que puedas conocer un poco más sobre mí y los proyectos que he realizado.

#

# Sobre el código

## Cliente con ApolloClient

```javascript
// Importamos los elementos necesarios
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

// Creamos el cliente
const client = new ApolloClient({
    // Se utilza cache, para que el servicio se ejecute de manera más rápida
    cache: new InMemoryCache(),
    // Hacemos uso de las claves de Contentful usando variables de entorno
    uri:
        "https://graphql.contentful.com/content/v1/spaces/" +
        process.env.REACT_APP_SPACE_ID,
    headers: {
        Authorization: "Bearer " + process.env.REACT_APP_ACCESS_TOKEN,
    },
});

// Encerrramos nuestra aplicación para poder usar el cliente en cualquier parte de la aplicación
ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>
);
```

---

## Consumo de API

```javascript
// Elemtos de Apollo
import { useQuery, gql } from "@apollo/client";
// Nos ayudará cuando queramos dar un mejor formato a los fields de texto amplios de Contentful
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

// Se crea la query de la consulta
const query = gql`
    query Products {
        productCollection {
            items {
                titulo
                link
                imagen {
                    url
                }
                datosDelProducto {
                    json
                }
            }
        }
    }
`;

// Consumimos la query, la cual nos arroja varios resultados
// data     => response
// errors   => errores que llegaran a surgir
// loading  => nos indica que esta recuperando la información
const { data, errors, loading } = useQuery(query);

// Ejemplo de como se consume la información
data.productCollection.items.map((prod) => (
    <>
        <CardMedia image={prod.imagen.url} title={prod.imagen.title} />
        {...}
        <Box>{documentToReactComponents(prod.datosDelProducto.json)}</Box>
    </>
));

// Usando 'documentToReactComponents', el texto se convierte directamente en parrafos que son más comodos de trabajar
```

#

# Reflexión personal

Al comienzo del desafío, no estaba familiarizado con la mayoría de las tecnologías mencionadas, excepto React, con la cual tenía algo de experiencia previa. No obstante, eso no me impidió dedicar mucho tiempo a investigar los temas, realizar pruebas y errores, y enfrentar la frustración de que las cosas no funcionaran como deseaba. Me llevó al menos un día completo comprender los conceptos básicos.

A medida que el tiempo se agotaba, me enfoque a desarrollar el proyecto e implementar lo que había aprendido, siguiendo la documentación y algunos tutoriales. Para ganar algo de tiempo, recurrí a código que había utilizado en proyectos anteriores, aunque no fue la mejor opción, ya que incluí código que no era relevante para este proyecto en particular. Sin embargo, me ayudó a avanzar en ciertas partes. Curiosamente, encontré más dificultades al depurar y mejorar el código que al programar desde cero.

Este proyecto es susceptible a mejoras. Estoy feliz con el resultado obtenido, me ha brindado una valiosa experiencia, ya que logre implementar y conocer nuevas funcionalidades sin tener conocimientos previos, y eso, en mi opinión, es un logro.

#

# Bibliografia

-   [ApolloDocs](https://www.apollographql.com/docs/react/)
-   [Apollo Github](https://github.com/apollographql/apollo-client-devtools)
-   [React, Contentful & ApolloClient](https://www.youtube.com/watch?v=mKPe6WB-dAc)
-   [GraphQL, React & ApolloClient](https://www.youtube.com/watch?v=sVFocedf-iU)
