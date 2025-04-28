import { applyDecorators, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function GenerateApiQueryParams<T>(filterClass: { getKeys: () => string[] }): MethodDecorator {
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        // Get the keys of the class or interface (from the static method)
        const keys = filterClass.getKeys();
        console.log('filterClass:', filterClass);

        // Apply decorators for each key
        keys.forEach((key) => {
            console.log(`Applying @ApiQuery for key: ${key}`);
            ApiQuery({ name: key, required: false })(target, propertyKey, descriptor);
        });

        
    };
}


export function GenerateQueryParams<T>(filterClass: { getKeys: () => string[] }): ParameterDecorator {
    return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
      // Get the keys of the class or interface (from the static method)
      const keys = filterClass.getKeys();
  
      // Dynamically create a query object from the keys
      const originalMethod = target[propertyKey];
      
      target[propertyKey] = (...args: any[]) => {
        const queryParams = args[parameterIndex] || {};
        keys.forEach((key) => {
          if (!(key in queryParams)) {
            // Ensure all keys exist in the query object
            queryParams[key] = undefined;
          }
        });
        args[parameterIndex] = queryParams;
        return originalMethod.apply(this, args);
      };
    };
  }