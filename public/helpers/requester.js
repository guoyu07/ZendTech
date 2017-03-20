'use strict';
import 'jquery'

export default {
    get: function(url, headers) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                method: 'GET',
                contentType: 'application/json',
                headers: headers,
                success: function(data) { resolve(data) },
                error: function(err) { reject(err) }
            });
        });
    },
    post: function(url, data, headers) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                method: 'POST',
                headers: headers,
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(data) { resolve(data) },
                error: function(err) { reject(err) }
            })
        });
    },

    put: function(url, data, headers) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                method: 'PUT',
                headers: headers,
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(data) { resolve(data) },
                error: function(err) { reject(err) }
            })
        });
    },

    del: function(url, data, headers) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                method: 'DELETE',
                headers: headers,
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(data) { resolve(data) },
                error: function(err) { reject(err) }
            })
        });
    }
}