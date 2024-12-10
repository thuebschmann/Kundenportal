<?php

namespace App\Repositories\Eloquent;

use App\Models\Kunde;
use App\Models\Users;

use App\Repositories\KundeRepositoryInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class KundeRepository extends BaseRepository implements KundeRepositoryInterface
{
    public function __construct(Kunde $model)
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

        $query->with('user');

        if (isset($params['filter'])) {
            $filter = $params['filter'];

            if (isset($filter['name'])) {
                $query->where('name', 'like', '%'.$filter['name'].'%');
            }

            if (isset($filter['vorname'])) {
                $query->where('vorname', 'like', '%'.$filter['vorname'].'%');
            }

            if (isset($filter['strasse'])) {
                $query->where('strasse', 'like', '%'.$filter['strasse'].'%');
            }

            if (isset($filter['plz'])) {
                $query->where('plz', 'like', '%'.$filter['plz'].'%');
            }

            if (isset($filter['ort'])) {
                $query->where('ort', 'like', '%'.$filter['ort'].'%');
            }

            if (isset($filter['land'])) {
                $query->where('land', 'like', '%'.$filter['land'].'%');
            }

            if (isset($filter['partnernr'])) {
                $query->where('partnernr', 'like', '%'.$filter['partnernr'].'%');
            }

            if (isset($filter['firma'])) {
                $query->where('firma', 'like', '%'.$filter['firma'].'%');
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
            $kunde = Kunde::create([
                    'name' => $attributes['name'] ?? null
,
                    'vorname' => $attributes['vorname'] ?? null
,
                    'strasse' => $attributes['strasse'] ?? null
,
                    'plz' => $attributes['plz'] ?? null
,
                    'ort' => $attributes['ort'] ?? null
,
                    'land' => $attributes['land'] ?? null
,
                    'partnernr' => $attributes['partnernr'] ?? null
,
                    'firma' => $attributes['firma'] ?? null
,
                    'user' => $attributes['user'] ?? null
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
            $kunde = Kunde::find($id);
            $kunde->update([
                    'name' => $attributes['name'] ?? null
,
                    'vorname' => $attributes['vorname'] ?? null
,
                    'strasse' => $attributes['strasse'] ?? null
,
                    'plz' => $attributes['plz'] ?? null
,
                    'ort' => $attributes['ort'] ?? null
,
                    'land' => $attributes['land'] ?? null
,
                    'partnernr' => $attributes['partnernr'] ?? null
,
                    'firma' => $attributes['firma'] ?? null
,
                    'user' => $attributes['user'] ?? null
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
            ->with('user')
            ->where('id', $id);

        return $query->get()[0];
    }

    public function findAllAutocomplete(array $params)
    {
        $query = $this->model->newModelQuery();

        $query->select('*', 'name as label');

        if (isset($params['query'])) {
            $query->where('name', 'like', '%'.$params['query'].'%');
        }

        if (isset($params['limit'])) {
            $query->limit($params['limit']);
        }

        $query->orderBy('name', 'ASC');

        return $query->get()
            ->map(fn($item) => ['id' => $item->id, 'label' => $item->label]);
    }
}

