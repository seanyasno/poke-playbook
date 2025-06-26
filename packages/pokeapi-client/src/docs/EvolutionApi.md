# EvolutionApi

All URIs are relative to *https://pokeapi.co*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV2EvolutionChainList**](#apiv2evolutionchainlist) | **GET** /api/v2/evolution-chain/ | List evolution chains|
|[**apiV2EvolutionChainRetrieve**](#apiv2evolutionchainretrieve) | **GET** /api/v2/evolution-chain/{id}/ | Get evolution chain|
|[**apiV2EvolutionTriggerList**](#apiv2evolutiontriggerlist) | **GET** /api/v2/evolution-trigger/ | List evolution triggers|
|[**apiV2EvolutionTriggerRetrieve**](#apiv2evolutiontriggerretrieve) | **GET** /api/v2/evolution-trigger/{id}/ | Get evolution trigger|

# **apiV2EvolutionChainList**
> PaginatedEvolutionChainSummaryList apiV2EvolutionChainList()

Evolution chains are essentially family trees. They start with the lowest stage within a family and detail evolution conditions for each as well as Pokémon they can evolve into up through the hierarchy.

### Example

```typescript
import {
    EvolutionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EvolutionApi(configuration);

let limit: number; //Number of results to return per page. (optional) (default to undefined)
let offset: number; //The initial index from which to return the results. (optional) (default to undefined)
let q: string; //> Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2) Case-insensitive query applied on the `name` property.  (optional) (default to undefined)

const { status, data } = await apiInstance.apiV2EvolutionChainList(
    limit,
    offset,
    q
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] | Number of results to return per page. | (optional) defaults to undefined|
| **offset** | [**number**] | The initial index from which to return the results. | (optional) defaults to undefined|
| **q** | [**string**] | &gt; Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2) Case-insensitive query applied on the &#x60;name&#x60; property.  | (optional) defaults to undefined|


### Return type

**PaginatedEvolutionChainSummaryList**

### Authorization

[basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV2EvolutionChainRetrieve**
> EvolutionChainDetail apiV2EvolutionChainRetrieve()

Evolution chains are essentially family trees. They start with the lowest stage within a family and detail evolution conditions for each as well as Pokémon they can evolve into up through the hierarchy.

### Example

```typescript
import {
    EvolutionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EvolutionApi(configuration);

let id: string; //This parameter can be a string or an integer. (default to undefined)

const { status, data } = await apiInstance.apiV2EvolutionChainRetrieve(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | This parameter can be a string or an integer. | defaults to undefined|


### Return type

**EvolutionChainDetail**

### Authorization

[basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV2EvolutionTriggerList**
> PaginatedEvolutionTriggerSummaryList apiV2EvolutionTriggerList()

Evolution triggers are the events and conditions that cause a Pokémon to evolve. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Methods_of_evolution) for greater detail.

### Example

```typescript
import {
    EvolutionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EvolutionApi(configuration);

let limit: number; //Number of results to return per page. (optional) (default to undefined)
let offset: number; //The initial index from which to return the results. (optional) (default to undefined)
let q: string; //> Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2) Case-insensitive query applied on the `name` property.  (optional) (default to undefined)

const { status, data } = await apiInstance.apiV2EvolutionTriggerList(
    limit,
    offset,
    q
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] | Number of results to return per page. | (optional) defaults to undefined|
| **offset** | [**number**] | The initial index from which to return the results. | (optional) defaults to undefined|
| **q** | [**string**] | &gt; Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2) Case-insensitive query applied on the &#x60;name&#x60; property.  | (optional) defaults to undefined|


### Return type

**PaginatedEvolutionTriggerSummaryList**

### Authorization

[basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV2EvolutionTriggerRetrieve**
> EvolutionTriggerDetail apiV2EvolutionTriggerRetrieve()

Evolution triggers are the events and conditions that cause a Pokémon to evolve. Check out [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Methods_of_evolution) for greater detail.

### Example

```typescript
import {
    EvolutionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EvolutionApi(configuration);

let id: string; //This parameter can be a string or an integer. (default to undefined)

const { status, data } = await apiInstance.apiV2EvolutionTriggerRetrieve(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | This parameter can be a string or an integer. | defaults to undefined|


### Return type

**EvolutionTriggerDetail**

### Authorization

[basicAuth](../README.md#basicAuth), [cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

