from collections import defaultdict
from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter(tags=["Workspace WebSocket"])
_connections: dict[int, set[WebSocket]] = defaultdict(set)


@router.websocket("/ws/teams/{team_id}")
async def team_chat_socket(websocket: WebSocket, team_id: int):
    await websocket.accept()
    _connections[team_id].add(websocket)
    try:
        while True:
            message = await websocket.receive_text()
            for connection in list(_connections[team_id]):
                try:
                    await connection.send_text(message)
                except Exception:
                    _connections[team_id].discard(connection)
    except WebSocketDisconnect:
        _connections[team_id].discard(websocket)
    finally:
        if not _connections[team_id]:
            _connections.pop(team_id, None)
