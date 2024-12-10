<?php

namespace App\Repositories\Eloquent;

use App\Models\Projekt;
use App\Models\Kunde;

use App\Repositories\ProjektRepositoryInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class ProjektRepository extends BaseRepository implements ProjektRepositoryInterface
{
    public function __construct(Projekt $model)
    {
        parent::__construct($model);
    }

    public function findAll($params) : array
    {
        $limit = 0;
        $offset = 0;
        $orderBy = null;

        $query = $this->model->newModelQuery();
        //$query->select("*", "product as prod_id");

        $query->with('kunde_id');

        if (isset($params['filter'])) {
            $filter = $params['filter'];

            if (isset($filter['name'])) {
                $query->where('name', 'like', '%'.$filter['name'].'%');
            }

            if (isset($filter['url'])) {
                $query->where('url', 'like', '%'.$filter['url'].'%');
            }

            if (isset($filter['apikey'])) {
                $query->where('apikey', 'like', '%'.$filter['apikey'].'%');
            }

            if (isset($filter['username'])) {
                $query->where('username', 'like', '%'.$filter['username'].'%');
            }

            if (isset($filter['password'])) {
                $query->where('password', 'like', '%'.$filter['password'].'%');
            }

            if (isset($filter['statusRange'])) {
                [$start, $end] = $filter['statusRange'];

                if (!empty($start)) {
                    $query->where('status', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('status', '<=', $end);
                }
            }

            if (isset($filter['active'])) {
                $query->where('active', $params['active']);
            }

            if (isset($filter['createdAtRange'])) {
                [$start, $end] = $filter['createdAtRange'];

                if (!empty($start)) {
                    $query->where('created_at', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('created_at', '<=', $end);
                }
            }
        }

        if ($limit) {
            $query->limit($limit);
        }

        $rows = $query->get();

        return [
            'rows' => $rows->toArray(),
            'count' => $rows->count(),
        ];
    }

    public function create(array $attributes, $currentUser)
    {
        try {
            $attributes = $attributes['data'];
            DB::beginTransaction();
            $attributes['created_by_user'] = $currentUser->id;
            $projekt = Projekt::create([
                    'kunde_id' => $attributes['kunde_id'] ?? null
,
                    'name' => $attributes['name'] ?? null
,
                    'status' => $attributes['status'] ?? null
,
                    'url' => $attributes['url'] ?? null
,
                    'apikey' => $attributes['apikey'] ?? null
,
                    'username' => $attributes['username'] ?? null
,
                    'password' => $attributes['password'] ?? null
,
                    'created_by_user' => $currentUser->id
                ]);

            DB::commit();

            return [];
        } catch (Exception $exception) {
            DB::rollback();
        }
    }

    public function update($id, array $attributes, $currentUser)
    {
        try {
            $attributes = $attributes['data'];
            DB::beginTransaction();
            $projekt = Projekt::find($id);
            $projekt->update([
                    'kunde_id' => $attributes['kunde_id'] ?? null
,
                    'name' => $attributes['name'] ?? null
,
                    'status' => $attributes['status'] ?? null
,
                    'url' => $attributes['url'] ?? null
,
                    'apikey' => $attributes['apikey'] ?? null
,
                    'username' => $attributes['username'] ?? null
,
                    'password' => $attributes['password'] ?? null
,
                    'updated_by_user' => $currentUser->id
                ]);

            DB::commit();

            return [];
        } catch (Exception $exception) {
            DB::rollback();
        }
    }

    public function destroy($id)
    {
        return $this->model->destroy($id);
    }

    public function findById($id)
    {
        $query = $this->model->newModelQuery();

        $query
            ->with('kunde_id')
            ->where('id', $id);

        return $query->get()[0];
    }

    public function findAllAutocomplete(array $params)
    {
        $query = $this->model->newModelQuery();

        $query->select('*', 'id as label');

        if (isset($params['query'])) {
            $query->where('id', 'like', '%'.$params['query'].'%');
        }

        if (isset($params['limit'])) {
            $query->limit($params['limit']);
        }

        $query->orderBy('id', 'ASC');

        return $query->get()
            ->map(fn($item) => ['id' => $item->id, 'label' => $item->label]);
    }
}

