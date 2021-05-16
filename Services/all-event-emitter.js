module.exports = class AllEventEmitter extends require('events') {
    emit(type, ...args) {
        super.emit('*', ...args);
        return super.emit(type, ...args) || super.emit('', ...args);
      }
}