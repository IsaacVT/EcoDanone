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

Al principio del reto, no conocía las tecnologías mencionadas, a excepción de React, que lo había practicado un poco. Sin embargo, eso no me detuvo para investigar bastante sobre los temas, hacer pruebas y errores, y lidiar con la frustración de que no funcionaba como quería o me gustaría. Eso me tomó al menos un día completo para entender cómo hacer lo básico.

Al ver que el tiempo se agotaba, comencé a desarrollar el proyecto e implementar lo aprendido, siguiendo la documentación y algunos tutoriales. Para ganar un poco de tiempo, reciclé código de proyectos anteriores, aunque no fue lo mejor, ya que incluí código que no me servía mucho, pero me ayudó a avanzar en algunas partes. Creo que sufrí más al limpiar el código que al programar desde cero.

De este proyecto, me llevo mucho aprendizaje. Aunque no es lo más extraordinario, logré implementar algunas funcionalidades sin tener conocimiento previo de estas tecnologías, y eso, personalmente, es un logro. Sin duda alguna, seguiré practicando e investigando. Agradezco la oportunidad.

#

# Bibliografia

-   [ApolloDocs](https://www.apollographql.com/docs/react/)
-   [Apollo Github](https://github.com/apollographql/apollo-client-devtools)
-   [React, Contentful & ApolloClient](https://www.youtube.com/watch?v=mKPe6WB-dAc)
-   [GraphQL, React & ApolloClient](https://www.youtube.com/watch?v=sVFocedf-iU)
