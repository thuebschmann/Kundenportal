<?php

namespace App\Repositories\Eloquent;

use App\Models\Projekt_access;
use App\Models\Users;
use App\Models\Projekt;

use App\Repositories\Projekt_accessRepositoryInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class Projekt_accessRepository extends BaseRepository implements Projekt_accessRepositoryInterface
{
    public function __construct(Projekt_access $model)
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

        $query->with('users_id');
        $query->with('projekt_id');

        if (isset($params['filter'])) {
            $filter = $params['filter'];

            if (isset($filter['level'])) {
                $query->where('level', 'like', '%'.$filter['level'].'%');
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
            $projekt_access = Projekt_access::create([
                    'level' => $attributes['level'] ?? null
,
                    'created_by_user' => $currentUser->id
                ]);

            $users_id = Users::find($attributes['users_id']);
            $projekt_access->users_id()->sync($users_id);

            $projekt_id = Projekt::find($attributes['projekt_id']);
            $projekt_access->projekt_id()->sync($projekt_id);

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
            $projekt_access = Projekt_access::find($id);
            $projekt_access->update([
                    'level' => $attributes['level'] ?? null
,
                    'updated_by_user' => $currentUser->id
                ]);

            $users_id = Users::find($attributes['users_id']);
            $projekt_access->users_id()->sync($users_id);

            $projekt_id = Projekt::find($attributes['projekt_id']);
            $projekt_access->projekt_id()->sync($projekt_id);

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
            ->with('users_id')
            ->with('projekt_id')
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

